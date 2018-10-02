// Instead of transforming every line as in the previous "TRANSFORM" example,
// for this challenge, convert even - numbered lines to upper -case and odd - numbered
// lines to lower -case.Consider the first line to be odd - numbered.For example
// given this input:

// One
// Two
// Three
// Four

// Your program should output:

// one
// TWO
// three
// FOUR

function createNewLineTransform() {
  let { Transform } = require("stream");
  let splitTransform = new Transform({
    transform(chunk, _, next) {
      lines = chunk.toString().split("\\n");
      lines.forEach((line, index) => {
        if (lines.length === index + 1) {
          this.push(line);
        } else {
          this.push(line + "\\n");
        }
      });
      next();
    }
  });
  return splitTransform;
}

function createUpperCaseTransform() {
  let { Transform } = require("stream");
  let counter = 1;
  let toUpperCaseTransformStream = new Transform({
    transform(line, _, callback) {
      if (counter === 1) {
        counter = 2;
        this.push(line.toString().toLowerCase());
      } else {
        counter = 1;
        this.push(line.toString().toUpperCase());
      }
      callback();
    }
  });
  return toUpperCaseTransformStream;
}

function lines() {
  let toUpperCaseTransform = createUpperCaseTransform();
  let splitTransform = createNewLineTransform();
  process.stdin
    .pipe(splitTransform)
    .pipe(toUpperCaseTransform)
    .pipe(process.stdout);
}

lines();
