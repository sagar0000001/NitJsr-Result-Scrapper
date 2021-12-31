let fs = require('fs');
let json = fs.readFileSync('./Scores.json');
let students = JSON.parse(json);


console.log(students.length);
// let count = 0;
let max = 0;
for (let i = 0; i < students.length; i++) {
    // if (students[i].cgpa >= 9) {
    //     console.log(students[i].roll);
    //     count++;
    // }



    // max = Math.max(max, students[i].cgpa);


}

// console.log(count);
// console.log(max);
