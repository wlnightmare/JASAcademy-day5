import React, { useMemo } from 'react'
import { ToDoItem } from './ToDoItem'

export function ToDoList({todos, onTodoChange}) {
  const sortedTodos = useMemo(() => {
    const s = [...todos]
    return s.sort((a,b)=>a.done - b.done)
  }, [todos])

  return (
    <div style={{margin:'40px 0px 40px 35px'}}>
      {sortedTodos.map((todo)=>(
        <ToDoItem key={todo.created} todo={todo} onTodoChange={onTodoChange}/>
      ))}
    </div>
  )   
}
