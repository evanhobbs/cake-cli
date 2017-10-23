var inquirer = require('inquirer')
var prompt = inquirer.createPromptModule();
var humps = require('humps');
// var ejs = require('ejs');
var fs = require('fs');
var Handlebars = require('handlebars');

var questions = [
  {
    type: 'input',
    name: 'className',
    message: 'What should this component be called?'
  },
  {
    type: 'list',
    name: 'componentType',
    default: 'function',
    choices: ['class', 'function'],
    message: 'Class or stateless functional component?'
  },
  {
    type: 'confirm',
    name: 'isConnected',
    default: false,
    message: 'Should it be connected?'
  },
  {
    type: 'confirm',
    name: 'createStorybook',
    default: false,
    message: 'Should it have a storybook?'
  },
  {
    type: 'input',
    name: 'filename',
    default: (answers) => {
      const base = humps.decamelize(answers.className, { separator: '-' });
      return `${base}.jsx`
    },
    message: 'What should the file be called?'
  },
] 

const classTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/component-class.hbs`, 'utf8')
);

const functionTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/component-function.hbs`, 'utf8')
);

export default () => {
  prompt(questions).then((answers) => {
    if (!fs.existsSync(answers.filename)) {
      const output = answers.componentType === 'class'
        ? classTemplate(answers)
        : functionTemplate(answers);
      fs.writeFileSync(answers.filename, output);
    }
    else {
      console.log('File with that name exists already!', answers.filename)
    }
  });  
}
