// @ts-nocheck
const {test, expect}=require('@playwright/test');

//import {test, expect} from '@playwright/test' //this is one more way to import
test('Login page', async ({page}) => {

        await page.goto('https://qaapexcrescendo.symphonysummit.com/');

        const pageTitle = await page.title();
        console.log('Page Title is: ', pageTitle);

        //await expect(page).toHaveTitle('SymphonyAI Summit');
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

        //click on Settings icon
        await page.click(".topbar-icon.icons-Settings-1")
        //click on design Studio
        await page.click("//span[text()='Design Studio']")
        await page.waitForSelector(".right-side-content")

        //click on module dropdown
        await page.click("//module-control//p-dropdown")
        await page.getByPlaceholder("Search Module").type("Service Request")
        await page.click("//p-dropdownitem/li")
        await page.waitForSelector(".right-side-content")

        //click on New button
        await page.click("button#btn_new")
        //select Start from scretch option
        await page.click("span.icons-Start-From-Scratch")
        await page.waitForSelector(".main-container")

        //***********Fill up General Stepper**********//
        //Name
        await page.type("#tableDisplyName","SR Catalog 1")
        //Description
        await page.fill("#viewDescription","SR Catalog Description.")
        //Form Image
        await page.locator("input#formImage").setInputFiles('./tests/uploads/1682559.png')
        await page.click(".p-dialog-footer p-button") //confirming upload
        //Tenant
        await page.click("//p-dropdown[@panelstyleclass='tenant-index']")
        await page.type("input.p-dropdown-filter","Information Technology")
        await page.click("p-dropdownitem.p-element li")
        //Type =Transaction form
        //await page.check("//p-radiobutton//label[text()='Transaction Form']")
        //await page.getByLabel("Transaction Form").click();
        await page.waitForSelector("//label[text()='Transaction Form']/../div")
        await page.click("//label[text()='Transaction Form']/../div")
        // await page.click("//label[text()='Transaction Form']/..//input", { force: true });
        await page.waitForSelector("//label[contains(text(),'Render Form As')]")
        //Persona
        await page.click("//span[text()='Select Persona']")
        await page.type("input.p-dropdown-filter","End User")
        await page.click("p-dropdownitem.p-element li")
        // Render Form As =Sub Form
        await page.click("//label[text()='Sub Form']/../div")
        await page.waitForSelector("//label[contains(text(),'Parent Form')]")
        //Form Group
        await page.click("//custom-group-dropdown-control[@formcontrolname='formGroupUniqueId']/div")
        await page.type("input.p-dropdown-filter","Catalogue Forms")
        await page.click("p-dropdownitem.p-element li")
        //Form Mode
        await page.click("//p-dropdown[contains(@inputid,'formMode')]")
        await page.type("input.p-dropdown-filter","Write")
        await page.click("p-dropdownitem.p-element li")
        //Parent Form
        await page.click("//p-dropdown[contains(@inputid,'parentForm')]")
        await page.type("input.p-dropdown-filter","Manage Service Requests")
        await page.click("p-dropdownitem.p-element li")
        //Category
        await page.click("//span[contains(@class,'icons-Tree-View')]/../input")
        await page.type("input.p-tree-filter","Big Data")
        await page.click("(//div[@role='treeitem']//span[contains(@class, 'p-treenode-label')])[last()]")
        //Menu Item
        await page.click("//p-dropdown[contains(@arialabelledby,'Menu Item')]")
        await page.type("input.p-dropdown-filter","My Service Requests")
        await page.click("p-dropdownitem.p-element li")
        //Table= Create a New Table
        await page.click("//label[text()='Create New table']/../div")
        await page.waitForSelector("//label[contains(text(),'Table Name')]")

        // Click on Next Button
        await page.click("//span[text()='Next']/..")
        //***********Fill up General Stepper**********//
        //deleting existing container
        await page.locator(".droppable-container-outer > .droppable-container > .last > container-component-renderer").click({ position: { x: 0, y: 0 } });
        await page.waitForSelector(".droppable-container-outer > .droppable-container > .last > container-component-renderer > .component-renderer > .settings")
        await page.locator(".droppable-container-outer > .droppable-container > .last > container-component-renderer > .component-renderer > .settings button[icon='icon icons-Delete-Popup']").click({force:true})
        await page.click("//span[text()='Yes, Delete']/..")

        await page.locator(".droppable-container-outer > .droppable-container > .last > container-component-renderer").click({ position: { x: 0, y: 0 } });
        await page.waitForSelector(".droppable-container-outer > .droppable-container > .last > container-component-renderer > .component-renderer > .settings")
        await page.locator(".droppable-container-outer > .droppable-container > .last > container-component-renderer > .component-renderer > .settings button[icon='icon icons-Delete-Popup']").click({force:true})
        await page.click("//span[text()='Yes, Delete']/..")

        //drag and drop elements
        //header
        await page.type("div#p-tabpanel-20 input.p-inputtext","Header")
        let src=await page.locator("div.input-card-icon")
        let trgt=await page.locator("droppable-container div.droppable-container")//this is main container
        // await src.hover()
        // await page.mouse.down()
        // await trgt.hover()
        // await page.mouse.up()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")

        //Splitter 30,70
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        src =await page.locator("//div[@class='card input-card focus']//div[contains(text(),'30,70')]")
        trgt=await page.locator("droppable-container div.droppable-container").first()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")
        //Splitter 60,40
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        src =await page.locator("//div[@class='card input-card focus']//div[contains(text(),'60,40')]")
        trgt=await page.locator("(//droppable-container/div/div)[last()]").last()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")
        //Splitter 60,40
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        src =await page.locator("//div[@class='card input-card focus']//div[contains(text(),'60,40')]")
        trgt=await page.locator("(//droppable-container/div/div)[last()]").last()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")
        //Splitter 60,40
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        src =await page.locator("//div[@class='card input-card focus']//div[contains(text(),'60,40')]")
        trgt=await page.locator("(//droppable-container/div/div)[last()]").last()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")

        //Footer ---already an element is dropped , next element i want to drop below that
        await page.type("div#p-tabpanel-20 input.p-inputtext","Footer")
        src =await page.locator("div.input-card-icon")
        trgt=await page.locator("(//droppable-container/div/div)[last()]").last()
        await src.dragTo(trgt);
        await page.click("div#p-tabpanel-20 a span.pi")

        await page.waitForTimeout(5000)
        //Logout process
        // await page.click("span.profile-image-wrapper")
        // await page.click("//span[text()='Logout']");
        // await page.close();
    })