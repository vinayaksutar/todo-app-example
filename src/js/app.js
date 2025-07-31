// Main application JavaScript
import TodoList from './components/TodoList.js';
import { StorageManager } from './utils/storage.js';

/**
 * Represents the main Todo application.
 * Handles initialization, event listeners, theme toggling, and interaction with storage and todo list.
 *
 * @class
 */
class TodoApp {
    /**
     * Creates an instance of TodoApp.
     * Initializes the todo list and storage manager, and sets up the application.
     */
    
    /**
     * Initializes the application by loading todos, setting up event listeners, and theme toggle.
     * @private
     */
    
    /**
     * Loads todos from storage and adds them to the todo list.
     * @private
     */
    
    /**
     * Sets up event listeners for adding todos and filtering by category.
     * @private
     */
    
    /**
     * Sets up theme toggling based on user's preference stored in localStorage.
     * @private
     */
    
    /**
     * Handles adding a new todo item from the input form.
     * Saves the new todo to storage and updates the UI.
     * @private
     */
}
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