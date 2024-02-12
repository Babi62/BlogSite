const fileSystem = require('fs');

// reading files
/* fileSystem.readFile('./Docs/blog.txt', (err, data) => {
    if (err) console.log(err);
    console.log(data.toString());
});


console.log('last line'); */

// Writing files

/* fileSystem.writeFile('./Docs/blog.txt', 'Hello World! \n Hello World!', () => {
    console.log('file was written');
})

fileSystem.writeFile('./Docs/blog1.txt', 'Hello World! \n Hello World!', () => {
    console.log('file was written');
}) */

// directories
/* if (!fileSystem.existsSync('./assets')) {
    fileSystem.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
            console.log("The File already exist");
        }
        console.log("Folder created sucessfully");
    })
} else {
    fileSystem.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder is removed");
    })
} */

// deleting directories
/* if (fileSystem.existsSync('./assets')) {
    fileSystem.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log("folder is removed");
    })
} else console.log("ooops File does not exist!!!")
 */


// deleting files
if (fileSystem.existsSync("./Docs/blog1.txt")) {
    fileSystem.unlink('./Docs/blog1.txt', (err) => {
        if (err) console.log(err)
        console.log("File Removed")
    })
}
else console.log("oooops file doesnot exist!!")
