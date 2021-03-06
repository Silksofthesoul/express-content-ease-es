import path from 'path';
require('dotenv').config();

export const PORT = process.env.PORT || 3000;
export const port = PORT;

export const expressStaticOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'mp3', 'ogg', 'wav', 'jpg', 'jpeg', 'png'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res) => {
    res.set('x-timestamp', Date.now());
  },
};

export const expressHeader = [
  {
    key: 'Access-Control-Allow-Origin',
    value: '*'
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,POST,PUT,DELETE,OPTIONS'
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'Origin, X-Requested-With, Content-Type, Accept'
  }

];

export const expressHeaderAlter = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
};

export const isCompileStatic = false;
export const isMinify = false;

export default {
  PORT,
  port,
  expressStaticOptions,
  expressHeader,
  expressHeaderAlter,
  isCompileStatic,
  isMinify
}
