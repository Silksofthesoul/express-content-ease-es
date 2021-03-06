import path from 'path';
import { readJSON } from '@src/controllers/assets';
import commonHandler from '@src/routes/handlers/common';

const co = o => JSON.parse(JSON.stringify(o));

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const pipeAsync = (...fns) => x => new Promise(async (resolve) => {
  let res = x;
  for (let f of fns) res = await f(res);
  resolve(res);
});

const route = async (app, ctx) => {
  try {
    var resPages = await readJSON('@src/data/pages.json');
  } catch (e) {
    if (e) return next({ message: e.message, stack: e.stack });
  }
  const {pages: routes = [], handlers: commonHandlers = []} = resPages;

  for (let router of routes) {
    let { url, template, content, handler } = router;
    let handlerFunction = async (_, h = null) => {
      if(h) {
        let res = _ => import(`@src/routes/handlers/${h}`);
        let {default: defaultModule} = await res();
        return defaultModule(_);
      } else {
        return _;
      }
    };

    let handlers = [
      _ => _,
      ...commonHandlers.map(h => async _ => {
        let res = _ => import(`@src/routes/handlers/${h}`);
        let {default: defaultModule} = await res();
        return defaultModule(_);
      }),
      _ => handlerFunction(_, handler),
    ];

    let {
      url: urlPath = null,
      template: templateFile = null,
      content: contentObject = {},
    } = await pipeAsync(...handlers)(router);

    app.get(urlPath, (req, res, next) => {
      res.render(templateFile, contentObject, function(err, html) {
        res.send(html);
      });
    });
  }
};

export default route;
