let fs = require('fs');
const url2 = "http://117.252.249.5/StudentPortal/ForgetPassword.aspx";

module.exports = async function (browser,roll) {
    try {
        console.log("Reset Password script run");

        let page2 = await browser.newPage();
        await page2.goto(url2)
        

        await page2.waitForSelector("#txt_username")
        await page2.click("#txt_username")

        //type username
        await page2.waitForSelector("#txt_username")
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

    } catch (error) {
        console.log(error.message);
    }
}


