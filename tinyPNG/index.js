#!/usr/bin/env node

/**
 * stagxu@outlook.com
 * API KEY:
 * vs9TnlFV45xnhjK5pPCfPf9VqX73TK6K
 *
 * DOC
 * https://tinypng.com/developers/reference/nodejs
 *
 * 参数
 *
 * -png -jpeg -jpg -webp
 *
 * --rs=w180 --rs=h180  --rf=180*180  --rc=180*180
 */

const tinify = require("tinify");
const fs = require("fs");
const path = require("path");
const { isDirectoryAsync, showErrorExist, showGreenInfo, showYellowInfo } = require("./tool");

const API_KEY = "vs9TnlFV45xnhjK5pPCfPf9VqX73TK6K";
const P_TYPES = ["-png", "-jpeg", "-jpg", "-webp"];
const R_TYPES = ["--rs", "--rf", "--rc"]; // resize     scale fit cover

tinify.key = API_KEY;

const absPath = process.cwd();

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
      fileName = arg.replace("./", "");
      const argPath = path.join(absPath, arg);
      if (fs.existsSync(argPath)) {
        const isDirectory = await isDirectoryAsync(argPath);
        // console.info("[isDirectory]", isDirectory);
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

async function transPicture() {
  const [resizeConfig, suffix, targetPath, fileName] = await parseArgsConfig();

  resizeConfig && showYellowInfo("resize: " + resizeConfig.method);
  suffix && showYellowInfo("suffix: " + suffix);

  const source = tinify.fromFile(targetPath);
  const pureFileName = fileName.replace(/(.png|.jpg|.webp|.jpeg)/g, "");
  const finalFileName = `${pureFileName}_tiny${suffix}`;
  const resultPath = path.join(absPath, finalFileName);
  const cb = () => {
    showGreenInfo(` -->  \n   ${finalFileName}  [full path: ${resultPath}]`);
  };
  console.info("wait ...");

  if (resizeConfig) {
    const resized = source.resize(resizeConfig);
    resized.toFile(resultPath, cb);
  } else {
    source.toFile(resultPath, cb);
  }
}

transPicture();
