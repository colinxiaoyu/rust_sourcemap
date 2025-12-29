
const fs = require('fs');
const sourceMapFileContent = fs.readFileSync('./843.936bbd722dcb69a80a59.js.map').toString();
// const sourceMapFileContent = fs.readFileSync('./946.9c7f425dfb727a43b6ef.js.map').toString();

const sourceMapContent = JSON.parse(sourceMapFileContent);

const sourceMap = require('source-map');
const SourceMapConsumer = sourceMap.SourceMapConsumer;

const consumer = new SourceMapConsumer(sourceMapContent);

consumer.then((c) => {


  const originalPosition = c.originalPositionFor({
    line: 2,
    column: 567888,
  });

  //  错误所对应的源码
  console.log('originalPosition', originalPosition)

})


