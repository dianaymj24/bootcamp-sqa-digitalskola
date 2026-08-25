const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome")

describe("Login Test for Belajar Bareng Web", function () {
    before(async ()  => {
        console.log("Starting the test suite for Belajar Bareng Login");
    });

    beforeEach(async () =>  {
       let options = new chrome.Options();
       options.addArguments("--headless");

        driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

        await driver.get("https://belajar-bareng.onrender.com");
    });

    afterEach(async () => {
        await driver.quit();

        console.log("Closed the browser after test execution");
    });

    after(async () => {
        console.log("Test suite completed");
    });

    it("Should Login Successfully",async function () {
        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let passwordInput = await driver.findElement(By.xpath("//*[@data-testid='password-input']"));
        let loginButton = await driver.findElement(By.xpath("//*[@data-testid='login-button']"));

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

        //redirect
        await driver.wait(until.urlContains("/users"),5000);

        //assert
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes("/users"),
            "User should be redirected to List Users"
        );        
    });

    it("Should Not Login with Invalid Username",async function () {
        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let passwordInput = await driver.findElement(By.xpath("//*[@data-testid='password-input']"));
        let loginButton = await driver.findElement(By.xpath("//*[@data-testid='login-button']"));

        await usernameInput.sendKeys("adman");
        await passwordInput.sendKeys("admin");
        await loginButton.click();

       //wait pop up element
        const toast = await driver.wait(
       until.elementLocated(
        By.xpath("//*[@data-testid='toast-content']")),5000);
               
        await driver.wait(
        until.elementTextContains(toast,"Invalid"),5000);
       
        //assert message
        const actual = await toast.getText();
        const expected = "Invalid username or password!";
        assert.strictEqual(actual, expected);        
    });


});