<script setup lang="ts">
const { todos, addTodo, updateTodo, deleteTodo } = useTodo();

const input = ref('');

function handleClick() {
  addTodo(input.value);

  input.value = '';
};
</script>

<template>
  <div
    class="container"
  >
    <NCard
      class="container_cards"
    >
      <h1>My Todo's</h1>

      <div class="add_todo">
        <input 
          v-model="input"
          placeholder="Add a new todo ..."
        />

        <NButton
          @click="handleClick"
        >
          Add
        </NButton>
      </div>
      
      <NCard
        class="card"
        v-for="todo in todos"
        :key="todo.id"
        @click="updateTodo(todo.id)"
      >
        <h4
          :class="todo.completed ? 'completed' : ''"
        >{{ todo.item }}</h4>
        <p
          @click="deleteTodo(todo.id)"
        >x</p>
      </NCard>
    </NCard>
  </div>
</template>

<style scoped>
 .container {
    padding: 2rem;
    margin: 0 auto;
    max-width: 50%;
 }

 .container_cards {
    padding: 2rem;
  }

  .add_todo {
    display: flex;
    justify-content: space-between;
  }

  input {
    outline: none;
  }

  .card {
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  .completed {
    text-decoration: line-through lightcoral;
  }
</style>
