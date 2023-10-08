var fs = require("fs");
//判断打开的是文件 还是 文件夹
// var path = "wen.txt";

function isDirectoryAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function (err, stat) {
      if (err) {
        console.error(err);
        throw err;
      }
      resolve(stat.isDirectory());
    });
  });
}

function showErrorExist(errorInfo, moreTip) {
  errorInfo && console.log("\x1b[31m", `[error: ${errorInfo}]`);
  moreTip && console.log("\x1b[35m", `[attention: ${moreTip}]`);
  process.exit();
}

function showGreenInfo(info) {
  info && console.log("\x1b[32m%s\x1b[0m", `Done ${info}`);
}

function showYellowInfo(info) {
  info && console.log("\x1b[33m%s\x1b[0m", `${info}`);
}

module.exports = { isDirectoryAsync, showErrorExist, showGreenInfo, showYellowInfo };
