/**
 * stagxu@outlook.com
 * API KEY:
 * vs9TnlFV45xnhjK5pPCfPf9VqX73TK6K
 *
 * 参数
 *
 * -png -jpeg -jpg -webp
 *
 * --rs=w180 --rs=h180  --rf=180*180  --rc=180*180
 */

const tinify = require("tinify");

const API_KEY = "vs9TnlFV45xnhjK5pPCfPf9VqX73TK6K";

tinify.key = API_KEY;

const source = tinify.fromFile("./Test/dbd.jpeg");
source.toFile("optimized.jpg");

function readArgs() {
  const args = process.env.args;
  console.info("args", args);
}

readArgs();
