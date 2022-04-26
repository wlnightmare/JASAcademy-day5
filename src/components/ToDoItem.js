import { Button, Checkbox, styled } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/todoItem.css'

const Title = styled('span')`
  text-decoration:${(props)=> props.done ? 'line-through' : 'none'};
`

export function ToDoItem({todo,onTodoChange}) {
  const dispatch = useDispatch()
  const created = useMemo(() => {
    return new Date(todo.created).toLocaleTimeString()
  }, [todo.created])

  const handleRemoveClick = useCallback(()=>{
    dispatch({type:'todos/remove',
  payload: todo.created})
  },[todo.created, dispatch])

  return (
    <div style={{width:'520px',height:'75px', marginBottom:'40px', border:'1px solid #C8C8C8', borderRadius:'8px'}}> 
      <Checkbox checked={todo.done} onChange={()=>onTodoChange(todo.created, !todo.done)}></Checkbox>
     <Title done={todo.done}>{todo.text}</Title>
      <Button size="small" onClick={handleRemoveClick}>Delete</Button>
      <br/>
      <span style={{width:'165px', height:'16px', fontFamily:'sans-serif', fontWeight:'400', color:'#797979', marginLeft:'14px'}}>created: {created}</span>
      <br/>
    </div>
  )
}
