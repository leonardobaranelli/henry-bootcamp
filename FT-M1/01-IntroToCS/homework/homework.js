'use strict';

function BinarioADecimal(num) {
   let decimal = 0;   
   
   for( let i = 0; i < num.length; i++){
      decimal += parseInt(num[i]) * 2 ** (num.length -1 -i);      
   }

   return decimal;

}

function DecimalABinario(num) {
   const binary = [];   

   while(num >= 1){
      binary.push(num % 2);
      num = Math.trunc(num / 2);
   }

   return binary.reverse().join("");
}

module.exports = {
   BinarioADecimal,
   DecimalABinario,
};
