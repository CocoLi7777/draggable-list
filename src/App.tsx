import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}
const initITodo = {
  text: '',
  complete: false
};

const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [draggedItem, setDraggedItem] = useState<ITodo>(initITodo);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault(); //avoid fresh the page
    addTodo(value);
    setValue('');
  };
  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  const removeHandle = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  function onDragStartHandle(e: React.DragEvent, index: number): void {
    setDraggedItem(todos[index]);
    e.dataTransfer.effectAllowed = 'move';
    //e.dataTransfer.setData('text/html', e.target.parentNode);
    //e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }
  function onDragOverHandle(index: number) {
    const draggedOverItem = todos[index];
    if (draggedOverItem === draggedItem) {
      return;
    }
    const items = todos.filter(item => item !== draggedItem);
    items.splice(index, 0, draggedItem);
    setTodos(items);
  }

  return (
    <div className="todolist">
      <h1>Schedule List</h1>
      <form onSubmit={handleSubmit} className="addForm">
        <input
          className="inputNew"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        ></input>
        <button type="submit" className="addBtn">
          Add New
        </button>
      </form>
      <section>
        <ul>
          {todos.map((todo: ITodo, index: number) => {
            return (
              <li
                key={index}
                onDragOver={() => onDragOverHandle(index)}
                className="item-style"
                draggable
                onDragStart={e => onDragStartHandle(e, index)}
              >
                <div
                  className="textContent"
                  style={{
                    textDecoration: todo.complete ? 'line-through' : ''
                  }}
                >
                  {todo.text}
                </div>
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => removeHandle(index)}
                >
                  &times;
                </button>
                <button
                  className="checkBtn"
                  type="button"
                  onClick={() => completeTodo(index)}
                >
                  {todo.complete ? 'Completed' : 'Incomplete'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default App;
