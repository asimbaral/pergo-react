import React, { useState, useEffect } from "react";
import {Route, BrowserRouter as Router, useParams} from 'react-router-dom';
import './App.css';

//Importing COmponents
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import PostList from "./components/PostList"
import Hello from "./components/Hello"
function App() {
  
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const apiURL = "http://localhost:8080/api/posts/?page=1&limit=10";

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
    fetch(apiURL)
        .then(res => res.json())
        .then(res => {
          //res.key = res[0]._id;
          //console.log(res);
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
  const [singlePost, setSinglePost] = useState([]);
  const PostPage = () => {
    let { id } = useParams();
    fetch("http://localhost:8080/api/posts/" + id)
        .then(res => res.json())
        .then(res => {
          //res.key = res[0]._id;
          console.log(res);
          setSinglePost([res]);
        });
    return (

      <PostList posts={singlePost}/>
      
      );
  }

  return (
    <Router>
     
      <Route path="/" exact>
         <div className="App">
        <header>
          <h1>PerGO</h1>
        </header>
          <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}/>
          <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
          <PostList posts={posts}/>
      </div> 
      </Route>

      <Route path="/postid/:id" exact>
        <PostPage />
      </Route>

    </Router>
  );
}

export default App;
