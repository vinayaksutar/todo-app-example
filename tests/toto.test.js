// Jest tests for Todo functionality
const TodoList = require('../src/js/components/TodoList');

describe('TodoList', () => {
    let todoList;

    beforeEach(() => {
        // Reset DOM
        document.body.innerHTML = `
            <div id="todoList"></div>
            <div id="totalCount">0</div>
            <div id="activeCount">0</div>
            <div id="completedCount">0</div>
        `;
        todoList = new TodoList();
    });

    test('should add a new todo', () => {
        const todo = todoList.addTodo({
            text: 'Test todo',
            category: 'work'
        });

        expect(todo.text).toBe('Test todo');
        expect(todo.category).toBe('work');
        expect(todo.completed).toBe(false);
        expect(todoList.todos.length).toBe(1);
    });

    test('should toggle todo completion', () => {
        const todo = todoList.addTodo({ text: 'Test todo' });
        expect(todo.completed).toBe(false);

        todoList.toggleTodo(todo.id);
        expect(todoList.todos[0].completed).toBe(true);
    });

    test('should delete a todo', () => {
        const todo = todoList.addTodo({ text: 'Test todo' });
        expect(todoList.todos.length).toBe(1);

        todoList.deleteTodo(todo.id);
        expect(todoList.todos.length).toBe(0);
    });

    test('should filter todos correctly', () => {
        todoList.addTodo({ text: 'Active todo', completed: false });
        todoList.addTodo({ text: 'Completed todo', completed: true });

        todoList.setFilter('active');
        expect(todoList.getFilteredTodos().length).toBe(1);

        todoList.setFilter('completed');
        expect(todoList.getFilteredTodos().length).toBe(1);

        todoList.setFilter('all');
        expect(todoList.getFilteredTodos().length).toBe(2);
    });

    test('should update stats correctly', () => {
        todoList.addTodo({ text: 'Todo 1', completed: false });
        todoList.addTodo({ text: 'Todo 2', completed: true });
        todoList.addTodo({ text: 'Todo 3', completed: false });

        todoList.updateStats();

        expect(document.getElementById('totalCount').textContent).toBe('3');
        expect(document.getElementById('activeCount').textContent).toBe('2');
        expect(document.getElementById('completedCount').textContent).toBe('1');
    });
});