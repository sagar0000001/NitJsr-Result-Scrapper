let fs = require('fs');
let str = "2018UGCS";

// console.log(str.slice(-3));

// let res = "";
let arr = [];
for (let i = 1; i <= 102; i++) {
    if (i == 87 || i == 65) continue;

    let s = "000" + i;
    s = str + s.slice(-3);
    // console.log(s);
    // res = res + s + "\n";
    arr.push(s);
}
// console.log(res);

// fs.writeFileSync("Rolls.txt", res);
fs.writeFileSync("../Output/Rolls.json", JSON.stringify(arr));

