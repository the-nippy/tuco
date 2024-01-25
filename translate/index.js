#!/usr/bin/env node

const { exec } = require("child_process");
const { showErrorExist } = require("../common/tool");

function parseArgsConfig() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    showErrorExist("(only) one word plz..");
  }
  const toTransWord = args[0].trim();
  if (!toTransWord) {
    showErrorExist("don't be blank plz..");
  }
  return toTransWord;
}

function toBrowserTranslate() {
  const toTransWord = parseArgsConfig();
  let url = "https://fanyi.baidu.com/#zh/en/";
  const letterREG = /^[a-zA-Z]/;
  if (letterREG.test()) {
    url = "https://fanyi.baidu.com/#en/zh/";
  }

  // https://stackoverflow.com/questions/8500326/how-to-use-nodejs-to-open-default-browser-and-navigate-to-a-specific-url
  var start = process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open";
  exec(`${start} ${url + toTransWord}`);
}

toBrowserTranslate();
