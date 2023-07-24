const fs = require('fs');

const data = 'Hello, World!';

fs.writeFile('example.txt', data, (err) => {
    if (err) {
        console.error('An error occurred:', err);
    } else {
        console.log('File written successfully');
    }
});
