export default function useTodo () {  
  const { data: todos, refresh } = useAsyncData('todos', () => {
    return $fetch('/api/todo');
  });

  async function addTodo (item: string) {
    if (!item) return;

    await $fetch('/api/todo', {
      method: 'POST',
      body: {
        item,
      },
    });

    refresh();
  };

  async function updateTodo(id: string) {
    await $fetch(`/api/todo/${id}`, {
      method: 'PUT',
    });

    refresh();
  };

  async function deleteTodo(id: string) {
    await $fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });

    refresh();
  }

  return ({ todos, addTodo, updateTodo, deleteTodo });
};