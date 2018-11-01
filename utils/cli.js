const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// init message ... just for fun
const init = () => {
  console.log(
    chalk.yellowBright(
      figlet.textSync('Amazon Scrapper', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};

// ask Question and get feedback
const getConfigInq = () => {
  const questions = [
    {
      name: 'KEYWORDS',
      type: 'input',
      message: 'Enter your search Keywords separated by a comma'
    },
    {
      name: 'DATA',
      type: 'checkbox',
      message: 'Choose your data?',
      choices: ['title', 'image', 'price', 'rating']
		},
		{
      name: 'PAGES',
      type: 'input',
      message: 'How many pages do you want to crawl to ?'
    },
  ];
  return inquirer.prompt(questions);
};

// ask questions depending on user input
// if he dosen't want to save data to a file then no need asking for file type
const saveFileInq = () => {
  return Promise.resolve(
    inquirer
      .prompt({
        name: 'SAVE',
        type: 'list',
        message: 'Do you want to save your data in a file?',
        choices: ['No', 'Yes']
      })
      .then(res => {
        if (res.SAVE == 'No') return { EXTENTION: null };
        return inquirer.prompt({
          name: 'EXTENTION',
          type: 'list',
          message: 'What kind of file format?',
          choices: ['.csv', '.json'],
          filter: val => {
            return val.split('.')[1];
          }
        });
      })
  );
};

module.exports = { init, getConfigInq, saveFileInq };
