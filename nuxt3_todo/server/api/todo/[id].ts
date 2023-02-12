import todo from '.';
import { db } from '../../db';
import { createError, sendError } from 'h3';

export default defineEventHandler((event) => {
  const method = event.node.req.method;
  const context = event.context;

  function findTodoById(id: string | undefined) {
    let index = 0;

    const todoItem = db.todo.find((todo, i) => {
      if (todo.id === id) {
        index = i;

        return true;
      };

      return false;
    });

    if (!todoItem) {
      const todoNotFoundError = createError({
        statusCode: 404,
        statusMessage: 'todo was not found',
        data: {},
      });

      sendError(event, todoNotFoundError);

      return ({todoItem: null, index});
    };

    return {todoItem, index};
  };

  if (method === 'PUT') {
    const {todoItem, index} = findTodoById(context.params?.id);

    if (!todoItem) return;

    todoItem.completed = !todoItem.completed;

    db.todo[index] = todoItem;

    return todoItem;
  };

  if (method === 'DELETE') {
    const { index } = findTodoById(context.params?.id);

    db.todo.splice(index, 1);

    return ({
      message: 'Item deleted successfully.'
    });
  };
});
