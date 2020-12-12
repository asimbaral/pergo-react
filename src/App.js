import React, { useState, useEffect } from "react";
import './App.css';

//Importing COmponents
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import PostList from "./components/PostList"
function App() {
  
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    fetchPosts();
  }, [todos, status]);

  // Functions
  const fetchPosts = () => {
    fetch('http://localhost:5000/mews')
        .then(res => res.json())
        .then(res => {
          setPosts(res);
        });
  }
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>PerGO</h1>
      </header>
        <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}/>
        <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
        <PostList posts={posts}/>
    </div>
  );
}

export default App;
