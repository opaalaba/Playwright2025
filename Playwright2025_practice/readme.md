Installation and Setup 
----------------------

Pre-requisite - 
	- VS Code - Visual Studio Code
		- https://code.visualstudio.com/download

	- NodeJS - Node Package Manager
		- https://nodejs.org/en/download

	- Microsoft Policy Issue - Open powershell in admin mode, Run this command
	- Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force


Commands from Playwright Installation
-------------------------------------
Default Commands from playwright - 

npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

Other Editor
------------

- Eclipse, PyCharm, IntelliJ, Cursor

- Spec file is call test case


- Account on github.com
- Install - git from git-scm website
- To check the Git Version - In terminal - git -v
- Basic GIT Commands - https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html

git config --global user.name "Sam Smith"
git config --global user.email sam@example.com


git config --global user.name "ishatesting7"
git config --global user.email ishatesting7@gmail.com

22nd July 
---------
Assignments -
1. Write a program to identify the value before decimal and after decimal are even or odd.
eg. 3948.432943 --> Two Parts --> 3948 and 432943 --> Then you will apply remainder by 


24th July 
---------
1. You will create a String Array and Number Array -> Use Minimum -> 12 Array Methods and show the value in the console area
2. You will create a String -> Use Minimum -> 15 Strings Methods on them and show them in the console area
3. You will create a Math Number - 4 to 5 numbers -> Use Minimum -> 20 Math Methods and show them in the console area

Programs -
---------
1. In an array of Number, find the largest number
2. In an array of Number, How many are Prime numbers
3. For a String - 'London' -> Reverse the letter of the String
4. For a Sentence - "I am new to javascript" -> Reverse the individual word 
output -> "I ma wen ot tpircsavaj"
5. Check the given word is Palindrome or not -> 'Mom'
6. To Display the Fibonacci Series -> 0 1 1 2 3 5 8 13



Locators -
---------- 

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

page.locator('CSS')


<input type="text" name="email" value="" placeholder="E-Mail Address" id="input-email" class="form-control">

HTML -
----

Tags - input/div/a/th/td/li/html/body/table/
Attributes - type, name, value, placeholder, id, class
Values - text, email, E-Mail Address,

CSS
---
1. If you are aware about classname in the html structure then the css selector would be - .classname - In case if there is space in the name of class please replace with '.'
2. If you are aware about id in the html structure then the css selector would be - #id - #input-email
3. If you are aware about attribute and value - [attribute='value'] = [id="input-email"]
4. If you are aware about tag, attribute and value - tag[attribute='value']
=input[id="input-email"]

Assertion - https://playwright.dev/docs/test-assertions

Handle RadioButton and Checkboxes -

https://www.dummyticket.com/dummy-ticket-for-visa-application/

Assertion - https://playwright.dev/docs/test-assertions

Handle RadioButton and Checkboxes -

https://www.dummyticket.com/dummy-ticket-for-visa-application/

Handle Dropdown and Auto Suggestion Dropdown

https://www.dummyticket.com/dummy-ticket-for-visa-application/

Handle below 3 Dropdown -

Purpose of dummy ticket (optional) Country State

Training Repo
---------------
[Go to Training repo](https://github.com/ishatesting7/Playwright_Automation_July2025/tree/main)
20 pages -
-------
pageObject - 20 js file - We will not use tag in this file

test

Admin
Job
Jobtest01.spec.js test('')
Jobtest02.spec.js
User
Leaves
Dashboard
Assigment Details - Total 12 Test Cases - 6th Aug 2025
--------------
Login in orange HRMS (beforeEach)
Validate each menu option - Such as Admin, PIM, Leaves and so on
After each validation - Logout - Confirm - You are logout (afterEach)
Selector Hub - Installation https://selectorshub.com/ Install for Chrome

Assigment Details - Total 12 Test Cases - 7th Aug 2025
------------
Create an end to end test case for Job Titles
Create an end to end test case for Pay Grades
Create an end to end test case for Employement Status
Create an end to end test case for Job Categories
Create an end to end test case for Work Shifts

--------------------------------------------------------
POM 
---
- Class File (Pages Files 15 pages)
  - page locators 
  - page functions

- tests
  - loginTest.spec.js
  - homepageTest.spec.js
  - aboutusTest.spec.js
  






CUCUMBER
--------



LLM + MCP Playwright + Agent
----------------------------

LLM - Large Language Model

ChatGPT
Gemini
Perplexity AI
Cloude

History

LLM cannot do 
1. Opening a browser and entering username/password
2. Connect to the database
3. Call APIs and Show the response


Prompting - Prompt Engineer
---------------------------

Agents
------
An agent is a system who is taking the instruction from an LLM and perform and convert into real time action using external tools


User --> Prompt --> LLM --> Agent ---> MCP

What is MCP - Model Context Protocol
MCP is a kind of framwork, which is reponsible for connecting LLM to real world tools such as DB, Browsers, APIs


MCP is acting a bridge --> Between LLM and Your application (AUT)

==================================================================
Test Data
---------
- Excel ---> JSON ---> Read the value from JSON

- JSON
- CSV
- text file


Report
-----------------
https://www.npmjs.com/package/allure-playwright


Official page - https://www.npmjs.com/package/allure-playwright

Generate Allure Report after the tests are executed:

npx playwright test

allure generate ./allure-results -o ./allure-report

allure generate ./allure-results -o ./allure-report --clean

Open the generated report:

allure open ./allure-report