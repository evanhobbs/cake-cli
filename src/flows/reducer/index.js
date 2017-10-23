var inquirer = require('inquirer')
var prompt = inquirer.createPromptModule();
var humps = require('humps');
// var ejs = require('ejs');
var fs = require('fs');
var Handlebars = require('handlebars');

var questions = [
  {
    type: 'input',
    name: 'reducerName',
    message: 'What should the saga be called?'
  },
  {
    type: 'confirm',
    name: 'createTests',
    default: false,
    message: 'Create tests file?'
  },
  {
    type: 'input',
    name: 'filename',
    default: (answers) => humps.decamelize(answers.reducerName, { separator: '-' }),
    message: 'What should the file be called?'
  },
] 

const reducerTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/reducer.hbs`, 'utf8')
);

const testTemplate = Handlebars.compile(
  fs.readFileSync(`${__dirname}/reducer.test.hbs`, 'utf8')
);

export default () => {
  prompt(questions).then((answers) => {
    if (!fs.existsSync(answers.filename)) {

      const reducerOutput = reducerTemplate(answers)
      fs.writeFileSync(`${answers.filename}.js`, reducerOutput);

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