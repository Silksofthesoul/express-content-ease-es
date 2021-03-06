import path from 'path';
import fs from 'fs';

export const brFabr = (title, isActive, link) => ({ title, isActive, link });
export const rndMinMaxInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const rndFromArray = arr => arr[rndMinMaxInt(0, arr.length - 1)];

export const flatten = lists => lists.reduce((a, b) => a.concat(b), []);

export const getDirectories = srcpath => fs.readdirSync(path.resolve(srcpath))
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());

export const getFiles = srcpath => fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isFile());

export const getDirectoriesRecursive = srcpath => [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];

export const registerPartials = (root, hbs) => {
  const partials = getDirectoriesRecursive(root);
  partials.shift();
  partials.forEach(item => {
    console.log('register partial >>', item);
    hbs.registerPartials(item)
  });
}


export default {
  brFabr,
  rndFromArray,
  rndMinMaxInt,
  getFiles,
  registerPartials
};
