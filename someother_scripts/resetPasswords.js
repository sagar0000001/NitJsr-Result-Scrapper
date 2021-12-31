let puppeteer = require('puppeteer-core');
let fs = require('fs');
const chromePaths = require("chrome-paths")
const CHROME_PATH = chromePaths.chrome;
// const url = "http://117.252.249.5/StudentPortal/Login.aspx";
const url = "http://117.252.249.5/StudentPortal/ForgetPassword.aspx";

let studentsJson = fs.readFileSync("Rolls.json");
let students = JSON.parse(studentsJson); // JSO



// url = "http://117.252.249.5/StudentPortal/ForgetPassword.aspx";
(async function () {
    let browser = await puppeteer.launch({
        headless: false,
        executablePath: CHROME_PATH,
        args: [
            '--start-maximized' // open browser in full screen
        ],
        defaultViewport: null // open website in full browser'screen
    });


    let page = await browser.newPage();

    for (let i = 0; i < students.length; i++) {
        console.log(i, students[i]);
        await page.goto(url)
        // console.log(students[0]);


        await page.waitForSelector("#txt_username")
        // console.log(students[0]);
        await page.click("#txt_username")
        // console.log(students[0]);


        //type username
        await page.waitForSelector("#txt_username")
        // console.log(students[0]);
        await page.type("#txt_username", students[i], { delay: 100 })

        //click password
        await page.waitForSelector("input[name='txtnewpass']")
        await page.click("input[name='txtnewpass']");

        //type password
        await page.waitForSelector("input[name='txtnewpass']")
        await page.type("input[name='txtnewpass']", "123456", { delay: 50 });

        //click new password
        await page.waitForSelector("input[name='txtConfirmpass']")
        await page.click("input[name='txtConfirmpass']");

        //type new password
        await page.waitForSelector("input[name='txtConfirmpass']")
        await page.type("input[name='txtConfirmpass']", "123456", { delay: 50 });

        await page.waitForSelector("input[name='btnSubmit']")
        await page.click("#btnSubmit")

    }
})()