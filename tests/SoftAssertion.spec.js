import {test, expect} from '@playwright/test'

test("Soft Assertion",async ({page})=>{

    await page.goto("https://demoblaze.com/")

    /*//Hard Assertion   
    await expect(page).toHaveTitle("STORE123")
    await expect(page).toHaveURL("https://demoblaze.com/")
    await expect(await page.locator("a.navbar-brand")).toBeVisible();
    */

    //Soft Assertion
    await expect.soft(page).toHaveTitle("STORE123")
    await expect.soft(page).toHaveURL("https://demoblaze.com/")
    await expect.soft(await page.locator("a.navbar-brand")).toBeVisible();
})