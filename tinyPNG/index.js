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

const API_KEY = "vs9TnlFV45xnhjK5pPCfPf9VqX73TK6K";
const P_TYPES = ["-png", "-jpeg", "-jpg", "-webp"];
const R_TYPES = ["--rs", "--rf", "--rc"]; // resize     scale fit cover

tinify.key = API_KEY;

const source = tinify.fromFile("./Test/dbd.jpeg");
source.toFile("optimized.jpg");

function readArgs() {
  const args = process.argv.slice(2);
  args.forEach((arg) => {
    if (P_TYPES.includes(arg)) {
      const suffix = P_TYPES.find((ele) => ele.includes(arg)).replace("-", ".");
    }

    let resizeConfig = null;
    if (["--rs", "--rf", "--rc"].includes(args)) {
      // resize: scale  只需要宽或者高
      if (args.startsWith("--rs")) {
      }
      // resize: fit cover 需要宽高
      else {
      }
    }
  });
  console.info("args", args);
}

readArgs();
