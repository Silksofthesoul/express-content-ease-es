import path from 'path';
import { readJSON } from '@src/controllers/assets';

const co = o => JSON.parse(JSON.stringify(o));

export default async ({
  url: _url = '',
  template: _template = null,
  content: _content = {}
}) => {
  try {
    var extra = await readJSON('@src/data/extra.json');
  } catch (e) {
    throw new Error(e);
  }
  const url = _url;
  const template = _template;
  const content = {
    ..._content,
    title: _content.title.replace(/Inner/gim, 'Allright'),
    extra,
    test: 'test',
    add: 'hello friend'
  };
  return { url, template, content };
};
