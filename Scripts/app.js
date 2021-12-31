let puppeteer = require('puppeteer-core');
let fs = require('fs');
const chromePaths = require("chrome-paths")
const CHROME_PATH = chromePaths.chrome;
let ResetPassword = require('./ResetPassword');
const { setTimeout } = require('timers');

const url = "http://117.252.249.5/StudentPortal/Login.aspx";


let studentsJson = fs.readFileSync("../Output/Rolls.json");
let students = JSON.parse(studentsJson); // JSO

let scoreCards = [];

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
let funAfterLogin = async function (page, i, flag) {
    // console.log("Sleeping");
    // // await setTimeout(2000); //This donot work
    // (async () => await new Promise(resolve => setTimeout(resolve, 1000)))(); //This work->To sleep
    // console.log("Slept");

    try {
        if (flag == true) { return false; }
        if (flag == false) {
            console.log("falg = ", flag, "line No. 24")
            await page.waitForNavigation();
        }


        await page.waitForSelector("select[name='ddlSemester'] option")
        let arr = await page.$$("select[name='ddlSemester'] option")

        console.log(arr.length);
        if (arr.length < 8) {
            return true;
        }


        await page.select("select[name='ddlSemester']", '7')
        await page.waitForSelector("#btnimgShowResult")
        await page.click("#btnimgShowResult")
        // await delay(300)


        //NAME
        await page.waitForSelector("#lblStudentName")
        const name = await page.$eval("#lblStudentName", element => element.innerText)


        //SGPA
        await page.waitForSelector("#lblSPI")
        const sgpa = await page.$eval("#lblSPI", element => element.innerText)
        // console.log();

        await page.waitForSelector("#lblCPI")
        const cgpa = await page.$eval("#lblCPI", element => element.innerText)
        console.log("CGPA = ", cgpa, " SGPA = ", sgpa);

        let obj = {};
        obj.roll = students[i].slice(-3);
        obj.name = name;
        obj.sgpa = sgpa;
        obj.cgpa = cgpa;

        scoreCards.push(obj);
        console.log("processed ", i, " student\n");
        
    } catch (err) {
        console.log("Result Selectors not found");
        return false;
    }

}

try {
    (async function () {
        // It opens the browser for us
        let browser = await puppeteer.launch({
            headless: true,
            executablePath: CHROME_PATH,
            args: [
                '--start-maximized' // open browser in full screen
            ],
            defaultViewport: null // open website in full browser'screen
        });

        let page = await browser.newPage();
        // let pages = await browser.pages();
        //Event Listener
        page.on("dialog", async dialog => {
            //  console.log("dailog = ", dialog);

            if (dialog._handled == false) { //This is imp
                await dialog.dismiss();
                // console.log(dialog.message());
                console.log("Alert Flag encountered");
                console.log("Resetting password for ", i, ' student');
                await ResetPassword(browser, students[i]); // password is reset
                flag = true;
                // await page.reload(); //for fresh login try
                console.log("flag = ", flag);
            }
        });

        let flag = false; //alert not came

        let i = 0;
        //We can't use For-Loop (when there is Event listeners)
        while (i < students.length) {
            console.log(i, students[i]);
            await page.goto(url)


            await page.waitForSelector("#txt_username")
            await page.click("#txt_username")
            // await delay(300)

            //type username
            await page.waitForSelector("#txt_username")
            // await page.type("#txt_username", students[i], { delay: 100 })
            await page.type("#txt_username", students[i])
            // await delay(300)



            await page.waitForSelector("#txt_password")
            await page.click("#txt_password")
            // await delay(300)


            //type password
            await page.waitForSelector("#txt_password")
            // await page.type("#txt_password", "123456", { delay: 100 })
            await page.type("#txt_password", "123456")
            // await delay(300)



            flag = false;
            await page.waitForSelector("input[name='btnSubmit']")
            await page.click("input[name='btnSubmit']")
            // await delay(300)


            await page.keyboard.press("Enter")



            let bool = await funAfterLogin(page, i, flag); //There is sleep inside fun
            if (bool === false || flag === true) { continue; }

            i++;
        }

        fs.writeFileSync("../Output/Scores.json", JSON.stringify(scoreCards))

    })();
} catch (e) { console.log(e.message); }

