export class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'todos';
    }

    getTodos() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            console.error('Error loading todos:', e);
            return [];
        }
    }

    saveTodo(todo) {
        const todos = this.getTodos();
        todos.push(todo);
        this.saveTodos(todos);
    }

    saveTodos(todos) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
        } catch (e) {
            console.error('Error saving todos:', e);
        }
    }

    deleteTodo(id) {
        const todos = this.getTodos().filter(t => t.id !== id);
        this.saveTodos(todos);
    }

    updateTodo(id, updates) {
        const todos = this.getTodos();
        const index = todos.findIndex(t => t.id === id);
        
        if (index !== -1) {
            todos[index] = { ...todos[index], ...updates };
            this.saveTodos(todos);
        }
    }
}