#!/usr/bin/env node

const { showYellowInfo } = require("./common/tool");

const pkgJSON = require("./package.json");

const args = process.argv.slice(2);

function dealArgs() {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.toLowerCase() === "-v" || arg.toLowerCase() === "--version") {
      showYellowInfo(pkgJSON.version, true);
      return;
    }
  }
}

dealArgs();
