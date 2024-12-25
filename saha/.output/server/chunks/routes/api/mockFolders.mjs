import { c as defineEventHandler } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';

const mockFolders = defineEventHandler(async () => {
  const mockFolders = [
    {
      id: 1,
      name: "\u041F\u0430\u043F\u043A\u0430 1",
      children: [
        { id: 2, name: "\u041F\u0430\u043F\u043A\u0430 1.1", children: [] },
        {
          id: 3,
          name: "\u041F\u0430\u043F\u043A\u0430 1.2",
          children: [{ id: 4, name: "\u041F\u0430\u043F\u043A\u0430 1.2.1", children: [] }]
        }
      ]
    },
    {
      id: 5,
      name: "\u041F\u0430\u043F\u043A\u0430 2",
      children: []
    }
  ];
  return mockFolders;
});

export { mockFolders as default };
//# sourceMappingURL=mockFolders.mjs.map
