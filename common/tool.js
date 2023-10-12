var fs = require("fs");

// 获取路径下内容，是文件，是目录，还是不存在

function getFileSize(filePath) {
  return new Promise((resolve) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        resolve(0);
      } else {
        const kb = (stats.size / 1024).toFixed(2);
        // console.log(`文件大小：${(stats.size / 1024).toFixed(2)} KB`);
        resolve(kb);
      }
    });
  });
}

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
  process.exit(1);
}

function showGreenInfo(info, exit) {
  info && console.log("\x1b[32m%s\x1b[0m", `Done ${info}`);
  exit && process.exit(0);
}

function showYellowInfo(info, exit) {
  info && console.log("\x1b[33m%s\x1b[0m", `${info}`);
  exit && process.exit(0);
}

module.exports = { getPathTargetType, showErrorExist, showGreenInfo, showYellowInfo, getFileSize };
