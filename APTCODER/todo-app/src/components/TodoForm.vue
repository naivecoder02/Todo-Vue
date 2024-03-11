<template>
    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" placeholder="Add a new todo" class="todo-input" @blur="validateInput">
      <button :disabled="!newTodo || hasError" class="add-btn" title="add a todo"><i class="fas fa-plus"></i></button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      hasError: Boolean
    },
    data() {
      return {
        newTodo: '',
      }
    },
    methods: {
      addTodo() {
        this.$emit('add-todo', this.newTodo);
        this.newTodo = '';
      },
      validateInput() {
        const hasError = !this.newTodo.trim();
        this.$emit('validate-input', hasError);
      }
    }
  }
  </script>
  
  <!-- Add relevant styles here -->
<style scoped>
.todo-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin: auto;
  width: 40%; 
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
</style>  