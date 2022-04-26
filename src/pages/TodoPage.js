import React, { useCallback } from 'react'
import { TodoForm } from '../components/ToDoForm'
import { ToDoList } from '../components/ToDoList'
import { useDispatch, useSelector  } from 'react-redux'

export function TodoPage() {
  const todos = useSelector((state)=> state.todos.todos)
  const dispatch = useDispatch()

  const handleCreate = useCallback((todo) => {
    dispatch({ type: 'todos/add', payload: todo})
  }, [dispatch])

  const handleTodoChanged = useCallback((created, value)=>{
    dispatch({
      type: 'todos/doneChange',
      payload: created,
      value,
    })
  }, [dispatch])
  
  return (
    <div className='ToDoWrapper'>
        <TodoForm onCreate={(handleCreate)}/>
        <ToDoList todos={todos} onTodoChange={handleTodoChanged}/>
    </div>
  )
}
