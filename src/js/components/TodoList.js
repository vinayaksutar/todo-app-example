export default class TodoList {
    constructor() {
        this.todos = [];
        this.filter = 'all';
        this.container = document.getElementById('todoList');
    }

    addTodo(todoData) {
        const todo = {
            id: todoData.id || Date.now(),
            text: todoData.text,
            category: todoData.category || 'other',
            completed: todoData.completed || false,
            createdAt: todoData.createdAt || new Date().toISOString()
        };

        this.todos.push(todo);
        this.render();
        this.updateStats();
        return todo;
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
            this.updateStats();
            return todo;
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.render();
        this.updateStats();
    }

    setFilter(filter) {
        this.filter = filter;
        this.updateFilterButtons();
        this.render();
    }

    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.filter);
        });
    }

    getFilteredTodos() {
        switch (this.filter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'work':
            case 'personal':
            case 'shopping':
            case 'health':
            case 'other':
                return this.todos.filter(t => t.category === this.filter);
            default:
                return this.todos;
        }
    }

    updateStats() {
        document.getElementById('totalCount').textContent = this.todos.length;
        document.getElementById('activeCount').textContent = 
            this.todos.filter(t => !t.completed).length;
        document.getElementById('completedCount').textContent = 
            this.todos.filter(t => t.completed).length;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.container.innerHTML = this.getEmptyState();
            return;
        }

        this.container.innerHTML = filteredTodos
            .map(todo => this.createTodoHTML(todo))
            .join('');
    }

    createTodoHTML(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="category-badge category-${todo.category}">
                            ${todo.category}
                        </span>
                        <span class="todo-date">${this.formatDate(todo.createdAt)}</span>
                    </div>
                </div>
                <button class="delete-btn" aria-label="Delete todo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;
    }

    getEmptyState() {
        return `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3>No tasks found!</h3>
                <p>Try changing the filter or adding a new task</p>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}