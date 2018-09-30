// Convert data from`process.stdin` to upper -case data on`process.stdout`
// using the`through2` module.

function transform() {
  let through = require("through2");
  process.stdin
    .pipe(
      through(function(buffer, enc, callback) {
        this.push(buffer.toString().toUpperCase());
        callback();
      })
    )
    .pipe(process.stdout);
}

transform();
