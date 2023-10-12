#!/usr/bin/env node

/**
 *
 * DOC
 * https://tinypng.com/developers/reference/nodejs
 *
 * 参数
 *
 * --key="xx"
 *
 * -png -jpeg -jpg -webp
 *
 * --rs=w180 --rs=h180  --rf=180*180  --rc=180*180
 */

const tinify = require("tinify");
const fs = require("fs");
const path = require("path");
const pkgJSON = require("../package.json");
const { getPathTargetType, showErrorExist, showGreenInfo, showYellowInfo, getFileSize } = require("./tool");

const P_TYPES = ["-png", "-jpeg", "-jpg", "-webp"];

const absPath = process.cwd();

const USER_HOME = process.env.HOME;
const keyFilePath = path.join(USER_HOME, ".npm", "tinyPNG_API_KEY");

async function readAPIKey() {
  const type = await getPathTargetType(keyFilePath);
  if (type === 1) {
    const tinyPNGKey = fs.readFileSync(keyFilePath).toString();
    return tinyPNGKey;
  }
  return "";
}

async function parseArgsConfig() {
  const args = process.argv.slice(2);
  // console.info("[args]", args);
  let resizeConfig = null;
  let suffix = "";
  let fileName = "";
  let targetPath = "";

  // 参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.toLowerCase() === "-v" || arg.toLowerCase() === "--version") {
      showYellowInfo(pkgJSON.version, true);
      return;
    }

    // 处理 --key 初始化
    if (arg.includes("--key=")) {
      const key = arg.replace("--key=", "");
      fs.writeFileSync(keyFilePath, key);
      showGreenInfo("init API Key ~ You don’t need to do this next time", true);
      return;
    }

    // 处理后缀参数
    if (P_TYPES.includes(arg)) {
      suffix = P_TYPES.find((ele) => ele.includes(arg)).replace("-", ".");
      continue;
    }

    // 处理缩放裁剪参数
    if (arg.includes("--rs") || arg.includes("--rf") || arg.includes("--rc")) {
      // resize: scale  只需要宽或者高
      if (arg.startsWith("--rs")) {
        const WHValue = arg.replace("--rs=", "");
        const value = parseInt(WHValue.replace(/w|h/g, ""));
        if (WHValue.startsWith("w")) {
          resizeConfig = {
            method: "scale",
            width: value,
          };
        } else if (WHValue.startsWith("h")) {
          resizeConfig = {
            method: "scale",
            height: value,
          };
        }
      }
      // resize: fit 需要宽高
      else if (arg.includes("--rf")) {
        const value = arg.replace("--rf=", "");
        const [width, height] = value.split("*").map((ele) => Number(ele));
        width && height && (resizeConfig = { method: "fit", width, height });
      }
      // resize:  cover 需要宽高
      else if (arg.includes("--rc")) {
        const value = arg.replace("--rc=", "");
        const [width, height] = value.split("*").map((ele) => Number(ele));
        width && height && (resizeConfig = { method: "cover", width, height });
      }
      if (!resizeConfig) {
        showErrorExist("resize arg is not correct", "Example --rs=w180 --rs=h180  --rf=180*180  --rc=180*180");
      }
      continue;
    }

    // 处理文件路径参数
    if (arg) {
      let argPath = "";
      if (path.isAbsolute(arg)) {
        // 绝对路径的图片
        const splits = arg.split("/");
        fileName = splits[splits.length - 1];
        argPath = arg;
      } else {
        // 相对路径的图片
        fileName = arg.replace("./", "");
        argPath = path.join(absPath, arg);
      }

      // console.info("[fileName]", fileName);
      // console.info("[argPath]", argPath);

      if (fs.existsSync(argPath)) {
        const targetPathType = await getPathTargetType(argPath);
        const isDirectory = targetPathType === 2;
        // 是文件夹
        if (isDirectory) {
        }
        // 是文件
        else {
          targetPath = argPath;
        }
      } else {
        showErrorExist("No such file or directory", "check path arg");
      }
    }
  }

  if (!fileName) {
    showErrorExist("No file found", 'Example => "tuco-tp -png test.webp"');
  }

  // 不指定后缀，使用相同后缀
  if (!suffix) {
    suffix = `.${fileName.split(".")[1]}`;
  }
  return [resizeConfig, suffix, targetPath, fileName];
}

async function triggerTask() {
  const [resizeConfig, suffix, targetPath, fileName] = await parseArgsConfig();

  const tinyPNGKey = await readAPIKey();
  if (!tinyPNGKey) {
    showErrorExist("should init tinyPNG-Key first");
  } else {
    tinify.key = tinyPNGKey;
  }

  resizeConfig && showYellowInfo("resize: " + resizeConfig.method);
  suffix && showYellowInfo("suffix: " + suffix);

  const source = tinify.fromFile(targetPath);

  const originSize = await getFileSize(targetPath);
  // console.info("[originSize]", originSize);

  const pureFileName = fileName.replace(/(.png|.jpg|.webp|.jpeg)/g, "");
  const finalFileName = `${pureFileName}_tiny${suffix}`;
  const directoryPath = path.resolve(targetPath, "../");
  // console.info("directoryPath", directoryPath);
  const resultPath = path.join(directoryPath, finalFileName);
  const cb = async (err) => {
    if (err) {
      console.info("error", err);
      showErrorExist("", "check tinyPNG API KEY, use --key='xxx' to reinitialize with the correct key");
    } else {
      const resultSize = await getFileSize(resultPath);

      showGreenInfo(` -->  \n  ${finalFileName}  ( ${originSize}KB --> ${resultSize}KB )\n  ( ${resultPath} )`);
    }
  };
  console.info("wait ...");

  if (resizeConfig) {
    const resized = source.resize(resizeConfig);
    resized.toFile(resultPath, cb);
  } else {
    source.toFile(resultPath, cb);
  }
}

// console.info('[keyFilePath]', keyFilePath)
triggerTask();
