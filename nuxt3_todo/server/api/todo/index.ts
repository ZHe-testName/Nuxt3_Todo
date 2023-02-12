import { createError, sendError } from 'h3';
import { db } from '../../db';
import { v4 as uuid } from 'uuid';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    return db.todo;
  };

  if (method === 'POST') {
    const body = await readBody(event);

    if (!body.item) {
      const todoNotFoundError = createError({
        statusCode: 400,
        statusMessage: 'Not item to provide',
        data: {},
      });

      sendError(event, todoNotFoundError);

      return ;
    };

    const todoItem = {
      id: uuid(),
      item: body.item,
      completed: false,
    };

    db.todo.push(todoItem);

    return todoItem;
  };
});
