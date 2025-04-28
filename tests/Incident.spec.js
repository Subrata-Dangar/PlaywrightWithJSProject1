import {test,expect} from '@playwright/test'
test('Log Incident', async ({page})=>{
    await page.goto("https://qaapexcrescendo.symphonysummit.com/")

    await expect.soft(page).toHaveURL('https://qaapexcrescendo.symphonysummit.com/login?returnUrl=%2Fdashboard');
        await page.waitForSelector("#lbl_email")

        //Enter Username and Password
        await page.fill("#ctrl_email","sysadmin@summitaicoe.co")
        //await page.locator("#ctrl_Password").click()
        await page.locator("#ctrl_Password").type("Password@123")
        //click on Login
        await page.locator("#btn_login").click()

        //click on setvice management Application
        await page.click("//span[text()='Service Management']")
        await page.waitForTimeout(2000)

        //pin consumer menu
        await page.locator("li#pin_menu").click({timeout:1000})

        await page.click("a.p-menuitem-link>span[title='Incident']",{force:true})
        await page.fill("//input[@placeholder='Search']","My Incident")
        await page.click("ul.p-megamenu-submenu li a span")

        await page.waitForSelector("button#btn_new")
        await page.click("button#btn_new")

        await page.waitForTimeout(5000)

})