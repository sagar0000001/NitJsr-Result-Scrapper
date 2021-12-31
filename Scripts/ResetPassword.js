// let puppeteer = require('puppeteer-core');
let fs = require('fs');

// url = "http://117.252.249.5/StudentPortal/Login.aspx";
const url2 = "http://117.252.249.5/StudentPortal/ForgetPassword.aspx";

// let studentsJson = fs.readFileSync("Rolls.json");
// let students = JSON.parse(studentsJson);
// console.log(students[0]);
// console.log(students[1]);

// let browser = puppeteer.launch({
//     headless: false,
//     executablePath: CHROME_PATH,
//     args: [
//         '--start-maximized' // open browser in full screen
//     ],
//     defaultViewport: null // open website in full browser'screen
// });

module.exports = async function (browser,roll) {
    try {

        // let browser = puppeteer.launch({
        //     headless: false,
        //     executablePath: CHROME_PATH,
        //     args: [
        //         '--start-maximized' // open browser in full screen
        //     ],
        //     defaultViewport: null // open website in full browser'screen
        // });


        console.log("Reset Password script run");
        // It opens the browser for us

        // let pages = await browser.pages();
        // let page = pages[0];
        let page2 = await browser.newPage();


        // console.log(i, students[i]);
        await page2.goto(url2)
        // console.log(students[0]);


        await page2.waitForSelector("#txt_username")
        // console.log(stubrowser2]);
        await page2.click("#txt_username")
        // console.log(students[0]);


        //type username
        await page2.waitForSelector("#txt_username")
        // console.log(students[0]);
        await page2.type("#txt_username", roll, { delay: 100 })

        //click password
        await page2.waitForSelector("input[name='txtnewpass']")
        await page2.click("input[name='txtnewpass']");

        //type password
        await page2.waitForSelector("input[name='txtnewpass']")
        await page2.type("input[name='txtnewpass']", "123456", { delay: 50 });

        //click new password
        await page2.waitForSelector("input[name='txtConfirmpass']")
        await page2.click("input[name='txtConfirmpass']");

        //type new password
        await page2.waitForSelector("input[name='txtConfirmpass']")
        await page2.type("input[name='txtConfirmpass']", "123456", { delay: 50 });

        await page2.waitForSelector("input[name='btnSubmit']")
        await page2.click("#btnSubmit")

       return await page2.close();
        // await browser2.close();

    } catch (error) {
        console.log(error.message);
    }
}


