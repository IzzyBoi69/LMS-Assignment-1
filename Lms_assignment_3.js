const fs = require('fs').promises;

function readFilePromise(filePath) {
    return fs.readFile(filePath, 'utf8');
}

function writeFilePromise(filePath, data) {
    return fs.writeFile(filePath, data, 'utf8');
}

async function processFiles(inputPath, outputPath) {
    try {
        const data = await readFilePromise(inputPath);
        await writeFilePromise(outputPath, data);
        console.log('File written successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Usage
processFiles('input.txt', 'output.txt');
