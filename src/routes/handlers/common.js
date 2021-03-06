import path from 'path';
import { readJSON } from '@src/controllers/assets';

export default async ({
  url: _url = '',
  template: _template = null,
  content: _content = {}
}) => {
  try {
    var {pages} = await readJSON('@src/data/pages.json');
  } catch (e) {
    throw new Error(e);
  }
  const navigation = pages.map(({url, content: {title}}) => ({url, title}))
  const url = _url;
  const template = _template;
  const content = {
    navigation,
    test2: 'hello from common handler',
    ..._content,
  };
  return { url, template, content };
};
