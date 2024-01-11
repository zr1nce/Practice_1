import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  }

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  }

  const onAllClickHandler = () => {
    props.changeFilter("all")
  }

  const onActiveClickHandler = () => {
    props.changeFilter("active")
  }

  const onCompletedClickHandler = () => {
    props.changeFilter("completed")
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {

            const onRemoveHandler = () => props.removeTask(t.id)

            return <li><input type={"checkbox"} checked={t.isDone} onChange={() => {
              props.changeStatus(t.id, !t.isDone)
            }} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          }
          )
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}

