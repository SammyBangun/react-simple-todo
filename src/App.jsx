import { useState, useEffect } from 'react';
import './App.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('all');
  

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = { id: Date.now(), task: input, completed: false};
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
  };

  const filterTodos = (filter) => {
    if (filter === 'all') return todos;
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    if (filter === 'uncompleted') return todos.filter((todo) => !todo.completed);
  };

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="filters">
        <button onClick={() => setStatus('all')} className={status === 'all' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => setStatus('completed')} className={status === 'completed' ? 'active' : ''}>
          Completed
        </button>
        <button onClick={() => setStatus('uncompleted')} className={status === 'uncompleted' ? 'active' : ''}>
          Uncompleted
        </button>
      </div>
      <ul>
    {filterTodos(status).map((todo) => (
    <li key={todo.id} className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      <span className={todo.completed ? 'strikethrough' : ''}>
        {todo.task}
        <button onClick={() => deleteTodo(todo.id)} className="delete-btn">Delete</button>
      </span>
    </li>
    ))}
    </ul>
    </div>
  );
};

export default Todo;