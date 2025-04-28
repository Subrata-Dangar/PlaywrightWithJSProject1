import {test, expect} from '@playwright/test'

test ("Assertion Test",async({page})=>{

    //open App URL
    await page.goto("https://demo.nopcommerce.com/register")

    //1)await expect(page).toHaveURL()	Page has a URL
    await expect(page).toHaveURL("https://demo.nopcommerce.com/register")	

    //2)await expect(page).toHaveTitle()	Page has a title
    await expect(page).toHaveTitle("nopCommerce demo store. Register")

    //3)await expect(locator).toBeVisible()	Element is visible
    //const logo= await page.getByAltText("nopCommerce demo store")//using builtin locator
    const logo =await page.locator(".header-logo a img")
    await expect(logo).toBeVisible()

    //4)await expect(locator).toBeEnabled()	Element is enabled
    const searchbox= await page.locator("#small-searchterms")
    await expect(searchbox).toBeEnabled()

    //5)await expect(locator).toBeChecked()	Checkbox/Radio button is checked
    //Radio button
    await page.click("#gender-male")
    const maleradio=await page.locator("#gender-male")
    await expect(maleradio).toBeChecked()

    //checkbox
    const check =await page.locator("#Newsletter")
    await expect(check).toBeChecked()

    //6)await expect(locator).toHaveAttribute()	Element has a DOM attribute
    const registerbtn= await page.locator("#register-button")
    await expect(registerbtn).toHaveAttribute("type","submit")

    //7)await expect(locator).toHaveText()	Element matches text
    const elementtxt=await page.locator(".page-title h1")
    await expect(elementtxt).toHaveText("Register")

    //8)await expect(locator).toContainText()	Element contains text
    await expect(elementtxt).toContainText("Regis")

    //9)await expect(locator).toHaveValue()	Input has a value
    const emailinput= await page.locator("#Email")
    emailinput.fill("a@abc.com")
    await expect(emailinput).toHaveValue("a@abc.com")

    //10)await expect(locator).toHaveCount()	List has exact number of children
    const dd= await page.locator("#customerCurrency option")
    await expect(dd).toHaveCount(2)

    //Negative
    await expect(dd).not.toHaveCount(5)

    await page.locator("#customerCurrency").click()
    await page.close();
})