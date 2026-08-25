const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome")

describe("Add User Test for Belajar Bareng Web", function () {
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

        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let passwordInput = await driver.findElement(By.xpath("//*[@data-testid='password-input']"));
        let loginButton = await driver.findElement(By.xpath("//*[@data-testid='login-button']"));

        await usernameInput.sendKeys("admin");
        await passwordInput.sendKeys("admin");
        await loginButton.click();
        //redirect
        await driver.wait(until.urlContains("/users"),5000);

        await driver.findElement(
        By.xpath("//*[@data-testid='add-button']"))
        .click();
    });

    afterEach(async () => {
        await driver.quit();

        console.log("Closed the browser after test execution");
    });

    after(async () => {
        console.log("Test suite completed");
    });

    it("Should Add User Successfully", async function () {
        
        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let ageInput = await driver.findElement(By.xpath("//*[@data-testid='age-input']"));

        await usernameInput.sendKeys("seonhokim");
        await ageInput.sendKeys("32");

        await driver.findElement(
        By.xpath("//*[@data-testid='submit-button']"))
        .click();

        //wait pop up element
        const toast = await driver.wait(
        until.elementLocated(
        By.xpath("//*[@data-testid='toast-content']")),5000
        );
        
        await driver.wait(
        until.elementTextContains(toast,"User successfully added"),5000
        );

        //assert message
        const actual = await toast.getText();
        const expected = "User successfully added, Hi seonhokim!";

        assert.strictEqual(actual, expected);
    });

    it("Should Not Add User When Age Is Empty", async function () {

        let usernameInput = await driver.findElement(By.xpath("//*[@data-testid='username-input']"));
        let ageInput = await driver.findElement(By.xpath("//*[@data-testid='age-input']"));

        await usernameInput.sendKeys("seonhokim");
        await ageInput.sendKeys("");

        await driver.findElement(
        By.xpath("//*[@data-testid='submit-button']"))
        .click();
        
        // Get browser validation message
        const message = await driver.executeScript(
            "return arguments[0].validationMessage;",
            ageInput
        );

        // Assertion
        assert.strictEqual(message,"Please fill out this field.");

    });

});