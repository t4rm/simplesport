const fs = require('fs-extra');

const filePath = 'node_modules/leaflet/dist/leaflet.css';
const linesToRemove = [359, 364, 407]; // replace with the line numbers you want to remove

fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    let result = data.split('\n').filter((line, index) => !linesToRemove.includes(index + 1)).join('\n');

    fs.writeFile(filePath, result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});