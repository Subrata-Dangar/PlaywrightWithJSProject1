import {test, expect} from '@playwright/test'

test("Inputbox",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com")

    //for test let's choose an inputbox
    const ipbox=await page.locator("#name")
    //Checking few Assertion for the inputbox
    await expect.soft(ipbox).toBeVisible();
    await expect.soft(ipbox).toBeEmpty()
    await expect.soft(ipbox).toBeEnabled();
    await expect.soft(ipbox).toBeEditable();
    await expect.soft(ipbox).toHaveAttribute("placeholder","Enter Name")
    //inderting data 
    ipbox.fill("John")

    await page.waitForTimeout(5000)
})