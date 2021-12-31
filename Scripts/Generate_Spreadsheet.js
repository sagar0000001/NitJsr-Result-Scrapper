let excel = require('excel4node')
let fs = require('fs')

let json = fs.readFileSync("../Output/Scores.json");
let students = JSON.parse(json);

let excel_Workbook = new excel.Workbook();

let headerStyle = excel_Workbook.createStyle({
    font: {
        color: "#ffffff",
        size: 11
    },

    fill: {
        type: "pattern",
        patternType: "solid",
        fgcolor: "Grey"
    }
});

let cellStyle = excel_Workbook.createStyle({
    font: {
        color: "#fefefe",
        size: 11
    },

    fill: {
        type: "pattern",
        patternType: "solid",
        fgcolor: "White"
    }
});

let sheet = excel_Workbook.addWorksheet("CSE");

sheet.cell(1, 1).string("Roll No.").style(headerStyle);
sheet.cell(1, 2).string("Name").style(headerStyle);
sheet.cell(1, 3).string("SGPA").style(headerStyle);
sheet.cell(1, 4).string("CGPA").style(headerStyle);

for (let i = 0; i < students.length; i++) {
    sheet.cell(2 + i, 1).string(students[i].roll);
    sheet.cell(2 + i, 2).string(students[i].name);
    sheet.cell(2 + i, 3).string(students[i].sgpa);
    sheet.cell(2 + i, 4).string(students[i].cgpa);
}

excel_Workbook.write("../Output/CseScores.csv")