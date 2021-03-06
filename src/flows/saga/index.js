var inquirer = require('inquirer')
var prompt = inquirer.createPromptModule();
var humps = require('humps');
// var ejs = require('ejs');
var fs = require('fs');
var Handlebars = require('handlebars');

var questions = [
  {
    type: 'input',
    name: 'sagaName',
    message: 'What should the saga be called?'
  },
  {
    type: 'confirm',
    name: 'createTests',
    default: true,
    message: 'Create tests file?'
  },
  {
    type: 'input',
    name: 'filename',
    default: (answers) => humps.decamelize(answers.sagaName, { separator: '-' }),
    message: 'What should the file be called?'
  },
] 

const sagaTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/saga.hbs`, 'utf8')
);

const testTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/saga.test.hbs`, 'utf8')
);

export default () => {
  prompt(questions).then((answers) => {
    if (!fs.existsSync(answers.filename)) {

      const sagaOutput = sagaTemplate(answers)
      fs.writeFileSync(`${answers.filename}.js`, sagaOutput);

      if (answers.createTests) {
        const testOutput = testTemplate(answers)
        fs.writeFileSync(`${answers.filename}.test.js`, testOutput);        
      }
    }
    else {
      console.log('File with that name exists already!', answers.filename)
    }
  });  
  
}