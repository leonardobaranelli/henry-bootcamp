const process = require('process');
const commands = require('./commands/index.js');

function bash() {
   process.stdout.write("prompt > ");      
   process.stdin.on("data", (data) => {
      const aux = data.toString().trim().split(" ");
      const cmd = aux.shift();
      const args = aux.join(" ");         
      
      if (commands[cmd]) commands[cmd](print, args);
      else print(`command not found: ${cmd}`);
   });
}

function print(output) {
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
}

bash();
module.exports = {
   print,
   bash,
};