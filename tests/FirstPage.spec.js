// @ts-nocheck
const {test, expect}=require('@playwright/test');

//import {test, expect} from '@playwright/test' //this is one more way to import
test('Login page', async ({page}) => {

        async function GetElementHeight(ele)
        {
            //let ele=await page.locator(x)
            let box=await ele.boundingBox()
            console.log("Element height now is"+box.height+"px")
            return box.height
        }
        async function dragAndDrop( sourceLocator, targetLocator) {
            const src = await page.locator(sourceLocator);
            const trgt = await page.locator(targetLocator);
        
            //const srcBox = await src.boundingBox();//commenting this since source element is visible
            await trgt.scrollIntoViewIfNeeded(); // Ensure the target is visible
            const trgtBox = await trgt.boundingBox();
            //if (srcBox && trgtBox)
            if (trgtBox) {
                // Move mouse to the center of the source element
                //await page.mouse.move(srcBox.x + srcBox.width / 2, srcBox.y + srcBox.height / 2);//commenting this since source element is visible
                await src.hover()
                await page.mouse.down(); // Press mouse button
                
                // Move mouse to the center of the target element smoothly
                await page.mouse.move(trgtBox.x + trgtBox.width / 2, trgtBox.y + trgtBox.height+10, { steps: 20 });
                await page.waitForTimeout(800); // Give time for target to update
                await page.mouse.up(); // Release mouse button
                console.log("Drag and drop successful!");
            } else {
                console.error("Source or target element not found!");
            }
        }

        async function dragAndDropInside(sourceLocator, lastDroppedLocator) {
            const src = await page.locator(sourceLocator);
            const lastDropped = await page.locator(lastDroppedLocator);
            
            await lastDropped.scrollIntoViewIfNeeded(); // Ensure last dropped element is visible
            const lastBox = await lastDropped.boundingBox();
        
            if (lastBox) {
                await src.hover();
                await page.mouse.down(); // Press mouse button
        
                // Move mouse to the left side of the last dropped element
                await page.mouse.move(lastBox.x + lastBox.width/2, lastBox.y + lastBox.height / 2, { steps:20 });
        
                await page.waitForTimeout(800); // Small delay for smooth drop
                await page.mouse.up(); // Release mouse button
                console.log("Drag and drop to the left successful!");
            } else {
                console.error("Last dropped element not found!");
            }
        }
        await page.goto('https://qaapexcrescendo.symphonysummit.com/');

        const pageTitle = await page.title();
        console.log('Page Title is: ', pageTitle);

        //await expect(page).toHaveTitle('SymphonyAI Summit');
        await expect.soft(page).toHaveURL('https://qaapexcrescendofw80.symphonysummit.com/login?returnUrl=%2Fdashboard');
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
        await page.waitForSelector("//module-control//p-dropdown")
        await page.click("//module-control//p-dropdown")
        await page.getByPlaceholder("Search Module").type("Service Request")
        await page.waitForSelector("//p-dropdownitem/li")
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
        await dragAndDrop("div.input-card-icon","droppable-container div.droppable-container")
        await page.click("div#p-tabpanel-20 a span.pi")
        

        //Splitter 30,70
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        await page.waitForSelector("//div[@class='card input-card focus']//div[contains(text(),'30,70')]")
        await dragAndDrop("//div[@class='card input-card focus']//div[contains(text(),'30,70')]","droppable-container.droppable-container-outer")
        await page.click("div#p-tabpanel-20 a span.pi")
        

        //Splitter 60,40
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        await page.waitForSelector("//div[@class='card input-card focus']//div[contains(text(),'60,40')]")
        await dragAndDrop("//div[@class='card input-card focus']//div[contains(text(),'60,40')]","droppable-container.droppable-container-outer")
        await page.click("div#p-tabpanel-20 a span.pi")

        //Splitter 80,20
        await page.type("div#p-tabpanel-20 input.p-inputtext","Splitter")
        //await page.type("div#p-tabpanel-20 input.p-inputtext","Horizontal")
        await page.waitForSelector("//div[@class='card input-card focus']//div[contains(text(),'80,20')]")
        await dragAndDrop("//div[@class='card input-card focus']//div[contains(text(),'80,20')]","droppable-container.droppable-container-outer")
        //await page.waitForSelector("div.input-card-icon>span")
        //await dragAndDrop("div.input-card-icon>span","droppable-container.droppable-container-outer")
        await page.click("div#p-tabpanel-20 a span.pi")
        

        //Footer ---already element is dropped , next element i want to drop below that
        await page.type("div#p-tabpanel-20 input.p-inputtext","Footer")
        await page.waitForSelector("div.input-card-icon")
        await dragAndDrop("div.input-card-icon","droppable-container.droppable-container-outer")
        await page.click("div#p-tabpanel-20 a span.pi")

        //Form Name
        await page.type("div#p-tabpanel-20 input.p-inputtext","Form Name")
        await page.waitForSelector("div.input-card-icon>span")
        await dragAndDrop("div.input-card-icon>span","(//header-layout//droppable-container//layout-row//droppable-container/div/div[1])[1]")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")

        async function DeleteElement(Element_locator) {
            await page.locator(Element_locator).hover();
            await page.waitForSelector("//div[contains(@style, 'display: block')]")
            await page.locator("//div[contains(@style, 'display: block')]//button[@icon='icon icons-Delete-Popup']").click({force:true})
            await page.click("//span[text()='Yes, Delete']/..")
        }
        //deleting ID
        await DeleteElement("//autoid-system-defined-field//span")
        // await page.locator("//autoid-system-defined-field//span").hover()
        // await page.waitForSelector("//div[contains(@style, 'display: block')]")
        // await page.locator("//div[contains(@style, 'display: block')]//button[@icon='icon icons-Delete-Popup']").click({force:true})
        // await page.click("//span[text()='Yes, Delete']/..")


        await page.click("//div[contains(@class, 'custom-tab-heading')]/span[text()='Widgets']")//clicks on wigets tab
        // await page.waitForSelector("a.search-input span.p-input-icon-left input.p-inputtext")
        await page.type("(//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext])[2]","Button")
        await page.waitForSelector("div.input-card-icon>span.icons-Form-Description")
        await dragAndDrop("div.input-card-icon>span.icons-Form-Description","(//header-layout//droppable-container//layout-row//droppable-container/div/div[1])[1]")
        //await dragAndDrop("div.input-card-icon>span.icons-Form-Description","(//header-layout//droppable-container//layout-row/div)[1]")
        await page.click("(//div[@role='tabpanel']//span[@class='pi pi-times'])[2]")

        await page.click("//div[contains(@class, 'custom-tab-heading')]/span[text()='Controls']")//clicks on controls tab
        //drag and drop panel
        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Panel")
        await page.waitForSelector("div.input-card-icon>span")
        await page.waitForSelector("//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//droppable-container//div")
        await page.mouse.wheel(0, 350);  // Scroll down
        await page.waitForTimeout(600); //UI Stablization
        //await dragAndDrop("div.input-card-icon>span","//label[contains(text(),'(30,70)')]/../..//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//droppable-container//div")
        await dragAndDropInside("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//droppable-container//div")
        await page.waitForSelector("//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//droppable-container//div")
        //await dragAndDrop("div.input-card-icon>span","//label[contains(text(),'(30,70)')]/../..//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//droppable-container//div")
        await page.mouse.wheel(0, 350);  // Scroll down
        await page.waitForTimeout(600); //UI Stablization
        await dragAndDropInside("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//droppable-container//div")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")

        //D & D Form Image
        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Form Image")
        await page.waitForSelector("//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//panel-container//div[contains(@class,'panelContent')]")
        await page.waitForSelector("//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//panel-container//div[contains(@class,'panelContent')]")
        //await dragAndDrop("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//panel-container//div[contains(@class,'panelContent')]")
        await (await page.locator("div.input-card-icon>span")).dragTo(await page.locator("//div[contains(@class,'p-splitter-panel') and contains(@style,'30')]//panel-container//div[contains(@class,'panelContent')]"))
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")
        //D&D Form Path
        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Form Path")
        await dragAndDropInside("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//panel-container//div[contains(@class,'panelContent')]")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")
        //D&D Form Paragraph
        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Paragraph")
        await page.waitForSelector("//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//panel-container//div[contains(@class,'panelContent')]")
        await dragAndDrop("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'70')]//panel-container//div[contains(@class,'panelContent')]")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")

        //D&D SR Fields
        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Single Choice")
        await page.waitForSelector("div.input-card-icon>span")
        await page.mouse.wheel(0, 400);  // Scroll down
        await page.waitForTimeout(500);   // Wait for UI to stabilize
        await dragAndDropInside("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'60')]/droppable-container")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")

        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Single Choice")
        await page.waitForSelector("div.input-card-icon>span")
        await page.mouse.wheel(0, 450);  // Scroll down
        await page.waitForTimeout(600); 
        await dragAndDrop("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'60')]/droppable-container")
        await page.click("//div[@role='tabpanel']//span[@class='pi pi-times']")

        await page.type("//div[@role='tabpanel']//div[contains(@class,'left-designer-panel')]//input[@pinputtext]","Long Text")
        await page.waitForSelector("div.input-card-icon>span")
        await page.mouse.wheel(0, 500);  // Scroll down
        await page.waitForTimeout(600);   // Wait for UI to stabilize
        await dragAndDrop("div.input-card-icon>span","//div[contains(@class,'p-splitter-panel') and contains(@style,'60')]/droppable-container")

        
        await page.waitForTimeout(5000)
        //Logout process
        await page.click("span.profile-image-wrapper")
        await page.click("//span[text()='Logout']");
        await page.close();
    })