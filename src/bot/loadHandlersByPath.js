const path = require("path");
const { readdirSync } = require("fs");

const getHandlersByDirname = dirName => {
  return readdirSync(dirName).map(fileName => path.join(dirName, fileName));
};

const loadHandlersByPath = (bot, dirName) => {
  getHandlersByDirname(dirName).forEach(filePath => {
    return require(filePath)(bot);
  });
};

module.exports = loadHandlersByPath;
