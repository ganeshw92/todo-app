import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TodoInput from './components/TodoInput';
import Footer from './components/footer';
import TodoItem from './components/TodoItem';

export interface todo {
  id: number,
  title: string,
  isCompleted: boolean,
  isEdit?: boolean
}

export const setStorage = (updatedTodos:todo[]) => {
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

export const getStorage = () => {
  let tds = localStorage.getItem('todos');

  if(tds) {
    return JSON.parse(tds);
  }
  return [];
}

function App() {
  let storedTodos:todo[] = getStorage() || [];

  const [todos, setTodos] = useState<todo[]>([]);

  useEffect(()=> {
    let data = getStorage();
    const newData = data.length ? data : [];

    if (newData) setTodos([...newData]);
  },[]);
  
  const handleCreateTodo = (val: string, editedTodo:any)=> {
      let updatedTodos = [];

      if (editedTodo) {
        updatedTodos = todos.map(item => {
          if (item.id === editedTodo.id) {
            return editedTodo;
          }
          return item;
        });
      } else {
        const newTodo = {
          id: Math.round(Math.random() * (1000 - 1) + 1),
          isCompleted: false,
          title: val
        }
        
        updatedTodos = [...todos, newTodo];
      }

      setTodos(updatedTodos);
      setStorage(updatedTodos);
}

  const handleCompleted = (id:number) => {
    todos.forEach(item => {
      if (item.id === id) item.isCompleted = !item.isCompleted;
    })
    setTodos([...todos]);
    setStorage(todos);
  }

  const handleDelete = (id:number) => {
    const updatedTodos = todos.filter(item=> item.id !== id);
    setStorage(updatedTodos);
    setTodos(updatedTodos);
  }

  const handleClearCompleted = () => {
    const clearCompletedTodos = todos.filter(item=> !item.isCompleted);

    setTodos(clearCompletedTodos);
    setStorage(clearCompletedTodos);
  }

  const handleCompleteAll = () => {
    const toggleComplete:boolean = todos.filter(ele => !ele.isCompleted).length === todos.length;
    const completeAllTodos = todos.map(item=> {
      return {
        ...item,
        isCompleted: toggleComplete
      }
    });

    setTodos([...completeAllTodos]);
    setStorage(completeAllTodos);
  }

  return (
    <div className="App">
      <TodoInput createTodo={handleCreateTodo} onCompleteAll={handleCompleteAll}/>
      { storedTodos.length ? <hr></hr> : null}
      <Routes>
        <Route path="/" element={<TodoItem todos={todos} updateTodo={handleCreateTodo} onDelete={handleDelete} onComplete={handleCompleted}/>}/>
        <Route path="/active" element={<TodoItem todos={todos} updateTodo={handleCreateTodo} onDelete={handleDelete} onComplete={handleCompleted}/>}/>
        <Route path="/completed" element={<TodoItem todos={todos} updateTodo={handleCreateTodo} onDelete={handleDelete} onComplete={handleCompleted}/>}/>
      </Routes>
      { storedTodos.length ? <hr></hr> : null}
      {storedTodos.length ? 
        <Footer clearTodos={handleClearCompleted} itemsLeft={storedTodos.filter(item=> !item.isCompleted).length}/> 
      : null}
    </div>
  );
}

export default App;
