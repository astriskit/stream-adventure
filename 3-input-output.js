// Take data from`process.stdin` and pipe it to`process.stdout`.

//     With`.pipe()`. `process.stdin.pipe()` to be exact.

//         Don't overthink this.

function inputOutput() {
  process.stdin.pipe(process.stdout);
}

inputOutput();
