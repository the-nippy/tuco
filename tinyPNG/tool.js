var fs = require("fs");

// 获取路径下内容，是文件，是目录，还是不存在

function getPathTargetType(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function (err, stat) {
      if (err) {
        // console.error(err);
        // throw err;
        resolve(0); // 文件不存在
        return;
      }
      if (stat.isFile()) {
        resolve(1); // 是文件
      } else if (stat.isDirectory()) {
        resolve(2); // 是目录
      }
    });
  });
}

function showErrorExist(errorInfo, moreTip) {
  errorInfo && console.log("\x1b[31m", `[error: ${errorInfo}]`);
  moreTip && console.log("\x1b[35m", `[attention: ${moreTip}]`);
  process.exit();
}

function showGreenInfo(info, exit) {
  info && console.log("\x1b[32m%s\x1b[0m", `Done ${info}`);
  exit && process.exit();
}

function showYellowInfo(info) {
  info && console.log("\x1b[33m%s\x1b[0m", `${info}`);
}

module.exports = { getPathTargetType, showErrorExist, showGreenInfo, showYellowInfo };
