import React from 'react'

export default function Todo (props) {

    const removeTodo = (id)=>{
        props.onRemove(id);
    }

    const completedTodo = (id)=>{
        props.onComplete(id)
    }

    let {id, title, isComplete} = props

        return (
            // 'completed' class for completed todos
            <div className={`todo ${isComplete ? 'completed' : ''}`} style={{ display: 'flex' }}>
                <li className="todo-item"> {title} </li>

                <button className="check-btn"
                onClick={()=>completedTodo(id)}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                </button>

                <button className="trash-btn"
                onClick={()=>removeTodo(id)}>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        )
}