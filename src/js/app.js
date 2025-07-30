// Main application JavaScript
import TodoList from './components/TodoList.js';
import { StorageManager } from './utils/storage.js';

class TodoApp {
    constructor() {
        this.todoList = new TodoList();
        this.storage = new StorageManager();
        this.init();
    }

    init() {
        this.loadTodos();
        this.setupEventListeners();
        this.setupThemeToggle();
    }

    loadTodos() {
        const todos = this.storage.getTodos();
        todos.forEach(todo => this.todoList.addTodo(todo));
    }

    setupEventListeners() {
        // Add todo form
        document.getElementById('addTodoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddTodo();
        });

        // Category filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.todoList.setFilter(e.target.dataset.filter);
            });
        });
    }

    setupThemeToggle() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    handleAddTodo() {
        const input = document.getElementById('todoInput');
        const category = document.getElementById('categorySelect').value;
        
        if (input.value.trim()) {
            const todo = this.todoList.addTodo({
                text: input.value.trim(),
                category: category
            });
            
            this.storage.saveTodo(todo);
            input.value = '';
            input.focus();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});