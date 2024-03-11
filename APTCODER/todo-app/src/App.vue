<template>
  <div id="app" :class="{ 'black-theme': isBlackTheme }">
    <h1 class="title">To-Do List</h1>
    <todo-form @add-todo="addTodo" @validate-input="validateInput" :hasError="hasError"></todo-form>
    <ul class="todo-list">
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove-todo="removeTodo"
        @edit-todo="editTodo"
        @toggle-complete="toggleComplete"
      ></todo-item>
    </ul>
    <i
      :class="[isBlackTheme ? 'fas fa-sun' : 'fas fa-moon', 'theme-toggle-icon']"
      @click="toggleBackgroundColor"
      title="Toggle Theme"
    ></i>
  </div>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    TodoForm,
    TodoItem
  },
  data() {
    return {
      todos: [],
      hasError: false,
      isBlackTheme: false,
    }
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      axios.get('http://localhost:3000/todos')
        .then(response => {
          this.todos = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    addTodo(newTitle) {
      if (!newTitle.trim()) {
        this.hasError = true;
        return;
      }

      axios.post('http://localhost:3000/todos', {
        title: newTitle,
        isComplete: false,
        createdAt: new Date()
      })
        .then(response => {
          this.todos.push(response.data);
          this.hasError = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeTodo(id) {
      axios.delete(`http://localhost:3000/todos/${id}`)
        .then(() => {
          const index = this.todos.findIndex(todo => todo.id === id);
          this.todos.splice(index, 1);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleComplete(todo) {
      axios.put(`http://localhost:3000/todos/${todo.id}`, {
        ...todo,
        isComplete: !todo.isComplete
      })
        .then(() => {
          todo.isComplete = !todo.isComplete;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editTodo(id) {
      const index = this.todos.findIndex(todo => todo.id === id);
      const updatedTodo = this.todos[index];
      const newTitle = prompt("Update todo:", updatedTodo.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        updatedTodo.title = newTitle.trim();
        axios.put(`http://localhost:3000/todos/${updatedTodo.id}`, updatedTodo)
          .then(() => {
            this.todos[index] = { ...updatedTodo, title: newTitle };
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    validateInput(hasError) {
      this.hasError = hasError;
    },
    toggleBackgroundColor() {
      this.isBlackTheme = !this.isBlackTheme;
    },
    handleToggleComplete(todo) {
    // Find the todo in your list and toggle its `isComplete` property
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    // Then update your todos array accordingly
    // This is just a placeholder; your actual update logic might differ
    this.updateTodos(updatedTodo);
  },
  }
}
</script>

<!-- Include your styles here -->

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  min-height: 100vh; 
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #4CAF50;
  position: relative; 
}

.todo-list {
  list-style-type: none;
  padding: 0;
  width: 40%; 
  margin: auto;
}

.black-theme {
  background-color: #000;
  color: #fff;
}


.black-theme .todo-input,
.black-theme .add-btn,
.black-theme .edit-btn,
.black-theme .remove-btn {
  color: #fff;
  border-color: #fff;
}

.black-theme .add-btn {
  background-color: #555; 
}

.black-theme .theme-toggle-icon {
  color: #fff; 
}

.theme-toggle-icon {
  cursor: pointer;
  position: fixed; 
  bottom: 20px;
  right: 20px; 
  font-size: 24px;
  color: black; 
}
</style>
