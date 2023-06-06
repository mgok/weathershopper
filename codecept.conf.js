const {setHeadlessWhen, setCommonPlugins} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
    tests: './*_test.js',
    output: './output',
    helpers: {
        Playwright: {
            url: 'https://weathershopper.pythonanywhere.com/',
            show: true,
            browser: 'chromium',
            waitForTimeout: 10000,
            show: false
        },
        World: {
            require: './helpers/world.js'
        },
        ChaiWrapper: {
            require: "codeceptjs-chai"
        }
    },
    include: {
        I: './steps_file.js',
        currentTemperaturePage: './pages/current-temperature-page.js',
        sunscreensPage: './pages/sun-screens-page.js',
        cartPage: './pages/cart-page.js',
        confirmationPage: './pages/confirmation-page.js',
        moisturizersPage: './pages/moisturizers-page.js'
    },
    gherkin: {
        features: './features/**/*.feature',
        steps: './step_definitions/**/*-steps.js'
    },
    name: 'weathershopper'
}