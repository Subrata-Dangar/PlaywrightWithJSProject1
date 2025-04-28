import {test,expect} from '@playwright/test'
test("Radio button",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    //for test let's choose a Radio button
    const rdbtn=await page.locator("#male")
    //Checking Assertion for the Radio button
    await expect.soft(await page.locator("#male").isChecked()).toBeFalsy();
    //checking radio button
    rdbtn.check()
    //rdbtn.click()
    //Checking Assertion for the Radio button
    await expect.soft(rdbtn).toBeChecked()
    await expect.soft(rdbtn.isChecked()).toBeTruthy()
    await page.waitForTimeout(5000)
})