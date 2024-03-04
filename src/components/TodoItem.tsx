import React, {useEffect, useState} from "react";
import { getStorage, todo } from "../App";
import { useLocation } from "react-router-dom";
import TodoInput from "./TodoInput";

interface todosProps {
    todos: todo[];
    onComplete: (id:number)=> void;
    onDelete: (id:number)=> void;
    updateTodo: (val: string, obj:todo) => void;
}

const TodoItem = ({todos, onComplete, onDelete, updateTodo}: todosProps) => {
    const [todoList, setTodoList] = useState<todo[]>(todos);
    const { pathname } = useLocation();

    useEffect(()=> {
        let filteredTodos = [];
        const data = getStorage();
        if (data) {
          const newData = data;
    
          switch (pathname) {
            case '/active':
              filteredTodos = newData?.filter((item:todo)=> !item.isCompleted);
              setTodoList(filteredTodos);
              break;
            case '/completed':
              filteredTodos = newData?.filter((item:todo)=> item.isCompleted);
              setTodoList(filteredTodos);
              break;
            default:
            setTodoList(newData);
            break;
          }
        }
    },[pathname, todos]);

    const handleCompleted = (e:any) => {
        const id = Number(e.currentTarget.value);
        onComplete(id);
    }

    const handleDelete = (e:any) => {
        const id = Number(e.currentTarget.value);
        onDelete(id);
    }

    const handleUpdateTodo = (val: string, todoObj:todo) => {
        updateTodo(val, todoObj);
    }

    const handleEdit = (id:number) => {
        todoList.map(item=> {
            return item.isEdit = item.id === id ? true : false;
        });

        setTodoList([...todoList]);
    }
    return (
        <ul>
            {todoList.map((ele, i) => {
                return (
                    <li key={i}>
                        <div className="item-row">
                        {ele.isEdit ?
                            <TodoInput createTodo={()=>handleUpdateTodo(ele.title, ele)} todoObj={ele}/>
                            : <div className="flx just-space-bet" data-testid="todo-items">
                                <div className="title" onClick={()=>handleEdit(ele.id)}>{ele.isCompleted ? <del>{ele.title}</del> : ele.title}</div>
                                <div className="action-btns">
                                    <button className="btn btn-complete" value={ele.id} type="button" onClick={handleCompleted}>Completed</button>
                                    <button className="btn btn-delete" value={ele.id} type="button" onClick={handleDelete}>X</button>
                                </div>
                            </div>
                        }
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TodoItem;