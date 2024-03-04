import React, { useState } from "react";
import { todo } from "../App";

interface createTodoProps {
    createTodo: (str: string, todoObj?:todo)=> void;
    onCompleteAll?: ()=> void;
    todoObj?: todo
  }

const TodoInput = ({createTodo, onCompleteAll, todoObj}:createTodoProps) => {
    const defaultTitle = todoObj ? todoObj.title : '';
    const [todo, setTodo] = useState(defaultTitle);
    const handleTodo = (e:any, todoObj?:todo) => {
        const { value } = e.currentTarget;
        setTodo(value);
        if (value !== '' && e.keyCode === 13) {
            if (todoObj) {
              todoObj.isEdit = false;
              todoObj.title = todo;
              createTodo(todo, todoObj);    
            } else {
              createTodo(todo);
            }
            setTodo('');
            e.currentTarget.value = '';
        }
    }

    return (
        <div className="flx just-space-bet">
            <div className="input">
                <input data-testid="todo-input" type='text' name='todo' defaultValue={todo} onKeyUp={(e)=>handleTodo(e, todoObj)}/>
            </div>
            {onCompleteAll ? 
            <div className="complete-all flx">
                <button className="btn btn-complete" name="complete_all" onClick={onCompleteAll}>Complete All</button>
            </div> : null}
        </div>
    )
}

export default TodoInput;