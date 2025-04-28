//import {test, expect} from '@playwright/test'
const {test, expect} = require('@playwright/test');

test('Locators',async ({page})=>{
    await page.goto("https://demoblaze.com/");
    
    // await page.locator('locator').click();
    // await page.click('locator');

    //click on Login link ---> using property
    //await page.locator('id=login2').click();
    await page.click('id=login2')

    //Provide usernamre --->CSS Selector
    //await page.locator("input[id='loginusername']").fill("Sub")
    await page.fill("input[id='loginusername']","Sub")

    //Provide password --->Xpath
    //await page.fill("//input[@id='loginpassword']","1998")
    await page.type("//input[@id='loginpassword']","1998")

    //Click on Login button
    await page.click("//button[contains(text(), 'Log in')]")

    //Verify logout link visibility
    const logout = await page.locator("//a[text()='Log out']")
    await expect(logout).toBeVisible()

    //click on Log out
    await page.click("//a[@id='logout2']")

    //close the browser
    await page.close();
})
