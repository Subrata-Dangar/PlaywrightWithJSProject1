import {test,expect} from '@playwright/test'

test("Locating Multiple Element",async ({page})=>{
    await page.goto("https://demoblaze.com/")
    // const Links =await page.$$('a')
    // for(const link of Links)
    // {
    //     const linkText = await link.textContent()
    //     console.log(linkText)
    // }
    await page.waitForSelector("//div[@id='tbodyid']//div//h4/a")
    const products = await page.$$("//div[@id='tbodyid']//div//h4/a")

    for(const product of products)
    {
        const product_name = await product.textContent()
        console.log(product_name)
    }

    await page.close()
})