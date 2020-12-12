import React from 'react';
const Form = ({setInputText, todos, setTodos, inputText, setStatus}) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value);
    };
    
    const submitTodoHandler = (e) => {
        e.preventDefault();
        const name  = "Asim";
        const content = "Just Started: " + inputText;
        const type = "Daily Goal";
        const goal = {
            name,
            content,
            type
        }
        postIt(goal);
        setTodos([
            ...todos, {text: inputText, completed: false, id: Math.random() * 1000}
        ]);
        setInputText("");
    };
    const statusHandler = (e) => {
        setStatus(e.target.value)
    }
    const postIt = (goal) => {
        //const proxyURL = 'https://cors-anywhere.herokuapp.com/';
        fetch('http://localhost:5000/mews', {
            method: 'POST',
            body: JSON.stringify(goal),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json());
    }
    return(
    <form>
        <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" maxLength="60"/>
        <button onClick={submitTodoHandler} className="todo-button" type="submit">
            <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
            <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            </select>
        </div>
    </form>
    );
};

export default Form;

