import React, { useState } from 'react';
import './App.css'
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active";

function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "TypeScript", isDone: false },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: false }
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let updatedTasks = tasks.map(t => {
      if (t.id === taskId){
        return {
          ...t,
          isDone
        }
      }
      return t;
    })
    setTasks(updatedTasks);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist title="What to learn?"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask} 
        changeStatus={changeStatus}
        />
    </div>
  )
}


export default App;