// this function takes in the url and local file path from the terminal
// then copies the requested file to a local file
const request = require('request');
const fs = require('fs');
const { Buffer } = require('safe-buffer');

const input = process.argv.slice(2);

// THINK ASYNCHRONOUSLY //

request(input[0], (error, response, body) => {
  if (error) {
    return console.log('error encountered: ', error);
  } else if (response.statusCode !== 200) {
    return console.log('Could not retrieve file! statusCode: ', response.statusCode);
  }
  fs.writeFile(input[1], body, 'utf-8', () => {
    fs.access(input[1],(err) => {
      if (err) {
        console.log('Please enter a valid local path.');
      } else {
        console.log(`Downloaded and saved ${Buffer.byteLength(body)} bytes to ${input[1]}`);
      }
    });
  });
});