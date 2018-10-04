// Your program will get some html written to stdin.Convert all the inner html to
// upper -case for elements with a class name of "loud",
//     and pipe all the html to stdout.

// You can use`trumpet` and`through2` to solve this adventure.

//     With`trumpet` you can create a transform stream from a css selector:

// var trumpet = require('trumpet');
// var fs = require('fs');
// var tr = trumpet();
// fs.createReadStream('input.html').pipe(tr);

// var stream = tr.select('.beep').createStream();

// Now`stream` outputs all the inner html content at`'.beep'` and the data you
// write to`stream` will appear as the new inner html content.

// Make sure to`npm install trumpet through2` in the directory where your solution
// file lives.

function htmlStream() {
  let trumpetStream = require("trumpet")();
  let toUpperCase = require("through2")(function(chunk, _, next) {
    this.push(chunk.toString().toUpperCase());
    next();
  });
  let loopStream = trumpetStream.createStream(".loud");
  loopStream.pipe(toUpperCase).pipe(loopStream); // refer containing issue with this comment - https://github.com/nodeschool/discussions/issues/346#issuecomment-293132881
  process.stdin.pipe(trumpetStream).pipe(process.stdout);
}

htmlStream();
