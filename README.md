# National Geographic WDIO Automation Testing Framework (Test Task)

This Automation Testing Framework for "National Geographic" web application.\
It's made for the purpose of demonstrating my ability to create testing frameworks.\
I used WebdriverIO to interact with browser and run test cases, and Allure for the reporting system.\
This framework written with ability to be run on different environments and have several options to run.\


## Installation

Before cloning the repository ensure that you have installed Node.JS, Java and JAVA_HOME path is set.\
If not, you can install them via next links:\
Node.JS - https://nodejs.org/en/download/current \
Java - https://www.oracle.com/cis/java/technologies/downloads/ \
How to set JAVA_HOME - https://www.baeldung.com/java-home-on-windows-7-8-10-mac-os-x-linux \
Java is necessary for generating and viewing Allure reports.

When preconditions are met please clone the repository and run "npm install" command in the terminal.

```bash
npm install
```

After installing necessary things, create .env file to store env variables for local running with such variables:

```bash
RUN_ENV=https://www.nationalgeographic.com/
LOG_LEVEL=INFO   # INFO, MUTE, VERBOSE, TECHNICAL, ERROR
MODE=SINGLE
WORKERS=
RETRIES=
BROWSERS=chromium# modern, chromium, firefox, webkit, mobile, mobile_chrome, mobile_safari, branded, branded_chrome, branded_edge, all
HEADLESS=false
TEST_TIMEOUT=
```

That's it. You can run the tests.

## Usage

```bash
# runs tests with Allure reporter.
npm run test:allure

# runs tests with console reporter.
npm run test:console

# generates Allure report
npm run report

# Deleting reports
npm run delete:report

```
