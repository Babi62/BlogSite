const fileSystem = require('fs');

const readStream = fileSystem.createReadStream('./Docs/blog.txt');
const writeStream = fileSystem.createWriteStream('./Docs/blog1.txt');


/* readStream.on('data', (chunk) => {
    console.log('----------New Chunk-----------');
    console.log(chunk.toString());

    writeStream.write('\n NEW CHUNK \n');
    writeStream.write(chunk);
}); */

// piping
readStream.pipe(writeStream);