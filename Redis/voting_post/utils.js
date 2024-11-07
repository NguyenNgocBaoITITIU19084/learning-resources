"use strict";

const converJSONtoArray = (json = {}) => {
  const arrayResult = [];
  for (var i in json) {
    arrayResult.push(i, json[i]);
  }
  return arrayResult;
};

module.exports = {
  converJSONtoArray,
};
