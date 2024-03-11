<template>
    <li class="todo-item">
    <input
      type="checkbox"
      :checked="todo.isComplete"
      @change="toggleComplete"
      class="todo-checkbox"
      title="mark as completed"
    >
      <span :class="{ completed: todo.isComplete }" class="todo-title">{{ todo.title }}</span>
      <span class="date">{{ formattedDate }}</span>
      <i  @click="$emit('remove-todo', todo.id)" class="remove-btn fas fa-trash-alt" title="remove the todo"></i>
      <i @click="$emit('edit-todo', todo.id)" class="edit-btn fas fa-edit" title="edit the todo"></i>
    </li>
  </template>
  
  <script>
  import { formatDate } from './utils'; 
  
  export default {
    props: {
      todo: Object
    },
    computed: {
      formattedDate() {
        return formatDate(this.todo.createdAt);
      }
    },
    methods: {
    toggleComplete() {
      // Emit an event to the parent component
      this.$emit('toggle-complete', this.todo);
    }
  }
  }
  </script>
  
  <style scoped>
.todo-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
}

.todo-checkbox {
  margin-right: 10px;
}

.todo-title {
  flex: 1;
  margin-right: 10px;
}

.completed {
  text-decoration: line-through;
}

.date {
  margin-right: 10px;
  color: #999;
}

.remove-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
  </style>
  ../../../utils