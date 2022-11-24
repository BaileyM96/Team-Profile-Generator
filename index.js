//Declare and intialize all variables 
// Add the filesystem 
// Add inquirer
const fs = require('fs');
const inquirer = require('inquirer');
// Add the test pages to this page
const Engineer = require("./lib/engineer");
const  Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Employee = require("./lib/employee");
const generateHTML = require("./lib/generatehtml");


inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));

const userPrompts = [
    {
        type: "confirm",
        name: "confirm",
        message: "Would you like to enter team members and info?",
    },
    {
        type: "list",
        message: "What is your position?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
    },
    {
        message: "What is your first and last name?",
        name: "username",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please enter valid name first and last");
            }
            return true;
        }
    },
    {
        message: "What is your employee ID?",
        name: "Id"
    },
    {
        message: "What is your email address?",
        name: "email",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("Please enter vaild email address ex JohnDoe@example.com");
            }
            return true;
        }
    },
    {
        message: "What is your office number?",
        name: "phoneNumber",
        when(answers) {
            return answers.role ==="Manager"
        }
    },
    {
        name: "engineer",
        message: "Enter github username",
        when(answers) {
            return answers.role === "Engineer"
        }
    },
    {
        name: "intern",
        message: "What school or program are you attending?",
        when(answers) {
            return answers.role === "Intern"
        }
    },
    {
        type: "loop",
        name: "employees", 
        message: "Would you like to add more team members such as manager, interns, engineers?",
        questions: [
            {
                type: "list",
                message: "Pick a position",
                name: "role",
                choices: ["Engineer", "Intern", "Manager"],
            },
            {
                message: "What is the name?",
                name: "username",
                validate: function(answer) {
                    if (answer.length < 1) {
                        return console.log("Please enter valid name first and last");
                    }
                    return true;
                }
            },
            {
                message: "What is the employee ID?",
                name: "Id"
            },
            {
                message: "What is the email address?",
                name: "email",
                validate: function(answer) {
                    if (answer.length < 1) {
                        return console.log("Please enter vaild email address ex JohnDoe@example.com");
                    }
                    return true;
                }
            },
            {
                message: "What is the office number?",
                name: "phoneNumber",
                when(answers) {
                    return answers.role ==="Manager"
                }
            },
            {
                name: "github",
                message: "Enter github username",
                when(answers) {
                    return answers.role === "Engineer"
                }
            },
            {
                name: "school",
                message: "What school or program are they attending?",
                when(answers) {
                    return answers.role === "Intern"
                }
            },
        ]
    }

]




function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err =>
        err ? console.error(err) : console.log("Your HTML has been generated")
        );
}



function init() {
    inquirer.prompt(userPrompts) 
    .then(function(userInput) {
        console.log(userInput);
        const newHTML = generateHTML(userInput);
        console.log(newHTML);
        writeToFile('index.html', newHTML);
    })
};


init();