const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

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

const askQuestions = () => {
  const questions = [
    {
      name: 'KEYWORDS',
      type: 'input',
      message: 'Enter your search Keywords separated by a comma?'
    },
    {
      name: 'FILTERS',
      type: 'list',
      message: 'Choose your filters?',
      choices: ['Baby', 'Arts & Crafts', 'Books']
    },
    {
      name: 'SAVE',
      type: 'list',
      message: 'Do you want to save your data in a file?',
      choices: ['No', 'Yes']
    },
    {
      name: 'EXTENTION',
      type: 'list',
      message: 'What kind of file format?',
      choices: ['.csv', '.xlsx'],
      filter: val => {
        return val.split('.')[1];
      }
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = { init, askQuestions };
