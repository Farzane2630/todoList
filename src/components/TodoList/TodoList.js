import React, { useState } from 'react'
import Header from './Header'
import Todo from './Todo'

export default function TodoList () {

    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')
    const [status, setStatus] = useState('all')
    const [inputValue, setInputValue] = useState('')

    const changeHandler = (e)=>{
        setInputValue(e.target.value)
    }

    const submitHandler = (e)=>{
        e.preventDefault()

        setTodos((prevState)=>{
            let newTodo = {
                id: todos.length + 1,
                title: inputValue,
                isComplete: false
            }
            return [...prevState, newTodo]
        })

        e.target[0].value = ""

    }

    const removeHandler = (todoId)=>{
        setTodos(prevState=>{
            let newTodoList = prevState.filter(todo=>{
                return todo.id !== todoId
            })
            return newTodoList
        })
    }

    const completTodo = (todoId)=>{
        setTodos((prevState)=>{
            let newTodos = [...todos]
            newTodos.forEach(todo=>{
                if(todo.id === todoId){
                    todo.isComplete = !todo.isComplete
                }
            })

            return newTodos
        })
    }


    const statusHandler = (e)=>{
        setStatus(e.target.value)
    }

        return (
            <>
                <Header />
                <form onSubmit={(e)=>submitHandler(e)}>
                    <input type="text" className="todo-input" maxLength="40" onChange={(e)=>changeHandler(e)}/>
                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={(e)=>statusHandler(e)}>
                            <option value="all" >All</option>
                            <option value="completed">Completed</option>
                            <option value="uncompleted">Uncompleted</option>
                        </select>
                    </div>
                </form>

                <div className="todo-container">
                    <ul className="todo-list">
                        {
                            status === 'all' && todos.map(todo=>(
                                <Todo key={todo.id} {...todo} onRemove={()=>removeHandler(todo.id)} onComplete={()=>completTodo(todo.id)} />
                            ))
                            
                        }
                        { 
                            status === 'completed' && todos.filter(todo => todo.isComplete).map(todo=>(
                                <Todo key={todo.id} {...todo} onRemove={()=>removeHandler(todo.id)} onComplete={()=>completTodo(todo.id)} />
                            ))
                        }
                        { 
                            status === 'uncompleted' && todos.filter(todo => !todo.isComplete).map(todo=>(
                                <Todo key={todo.id} {...todo} onRemove={()=>removeHandler(todo.id)} onComplete={()=>completTodo(todo.id)} />
                            ))
                        } 
                    </ul>
                </div>
            </>
        )
}
