import inquirer from 'inquirer';
var prompt = inquirer.createPromptModule();
import humps from 'humps';
import fs from 'fs';
import { registerHandlebarsHelpers } from './utils';
import componentFlow from './flows/component';
import sagaFlow from './flows/saga';

registerHandlebarsHelpers();

var questions = [
  {
    type: 'list',
    name: 'flowType',
    default: 'component',
    choices: ['component', 'saga'],
    message: 'What would you like to make?'
  },
] 

prompt(questions).then(({ flowType }) => {
  if (flowType === 'component') componentFlow();
  if (flowType === 'saga') sagaFlow();
});
