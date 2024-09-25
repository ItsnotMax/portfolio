import { d as defineEventHandler } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const links = defineEventHandler((event) => {
  return [
    {
      title: "SPA SSR Pinia Middleware Plugins",
      description: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0441\u0435\u0431\u044F \u0438 \u0441\u0432\u043E\u0438\u0445 \u0434\u0435\u0442\u0435\u0439",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/spa_Alef"
    },
    {
      title: "SPA SSR Pinia Middleware Plugins",
      description: "\u041F\u043E\u0438\u0441\u043A \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432 \u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u043D\u0438\u0445",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/spa_Jilfond"
    },
    {
      title: "SPA SSR Pinia Middleware",
      description: "\u041B\u0435\u0433\u043A\u0438\u0439 \u0441\u0430\u0439\u0442 \u0441 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u043C\u0438 \u0438 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0435\u0439",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/spa_QT"
    },
    {
      title: "\u0410\u0434\u0430\u043F\u0442\u0438\u0432",
      description: "\u041B\u044D\u043D\u0434\u0438\u043D\u0433 \u0441 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0435\u0439",
      link: "https://itsnotmax.github.io/portfolio/html/yandex/"
    },
    {
      title: "SPA",
      description: "SPA \u043D\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0435. \u041C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043B\u044E\u0431\u0438\u043C\u044B\u0435 \u043A\u043D\u0438\u0433\u0438, \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D\u043D\u044B\u0435 \u043A\u043D\u0438\u0433\u0438 \u0438 \u0442\u0434",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/Vue3/bookshelf"
    },
    {
      title: "React",
      description: "\u0414\u043B\u044F \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u0435\u0439 \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u043E\u0439 StarWars",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/React/StarWars/my-app"
    },
    {
      title: "CRM \u043D\u0430 JS",
      description: "\u041D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0443\u0434\u043E\u0431\u0435\u043D Vue \u0438 \u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u043B\u043E\u0436\u043D\u0430 \u0432\u0430\u043D\u0438\u043B\u0430",
      link: "https://github.com/ItsnotMax/portfolio/tree/main/Vue3/crm"
    }
  ];
});

export { links as default };
//# sourceMappingURL=links.mjs.map
