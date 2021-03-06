import path from 'path';
import fs from 'fs';

const { readFile: _readFile } = fs.promises;


const s = (_) => {
  try {
    var res = JSON.stringify(_);
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};
const p = (_) => {
  try {
    var res = JSON.parse(_);
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};
const co = (_) => {
  try {
    var res = p(s(_));
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};

export const readJSON = async (pathToFile) => {
  const pathJson = path.resolve(pathToFile);
  try {
    const file = await _readFile(pathJson);
    var json = p(file.toString());
  } catch (e) {
    if (e) throw new Error(e);
  }
  return json;
};

export const readFile = async (pathToFile) => {
  const pathJson = path.resolve(pathToFile);
  try {
    const file = await _readFile(pathJson);
    var res = file.toString();
  } catch (e) {
    if (e) throw new Error(e);
  }
  return res;
};

export default {
  readJSON,
  readFile
};
