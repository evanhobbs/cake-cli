#!/usr/bin/env node
import inquirer from 'inquirer';
var prompt = inquirer.createPromptModule();
import humps from 'humps';
import fs from 'fs';
import { registerHandlebarsHelpers } from './utils';
import componentFlow from './flows/component';
import sagaFlow from './flows/saga';
import reducerFlow from './flows/reducer';

registerHandlebarsHelpers();

var questions = [
  {
    type: 'list',
    name: 'flowType',
    default: 'component',
    choices: ['component', 'reducer', 'saga'],
    message: 'What would you like to make?'
  },
] 

prompt(questions).then(({ flowType }) => {
  if (flowType === 'component') componentFlow();
  if (flowType === 'saga') sagaFlow();
  if (flowType === 'reducer') reducerFlow();
});
