"use client"

import React, { useEffect, useState } from "react"
import Task, { ITask } from "../Task/page"

interface ISection {
  name: string,
  bg50: string,
  bg100: string,
  bg200: string,
  bg500: string,
  text200: string
}

const Section = (props: ISection) => {

  const [ tasks, setTasks ] = useState<ITask[]>([])


  //==========================FUNCTIONS

  const handleAddTask = () => {
    setTasks([ ...tasks, { id: new Date().getTime(), title: "", responsible: "" } ])
  }

  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id != id)
    setTasks(newTasks)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("after:block", "after:h-1", "after:bg-blue-400")
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("after:block", "after:h-1", "after:+bg-blue-400")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("after:block", "after:h-1", "after:bg-blue-400")
    setTasks([ ...tasks, { title: e.dataTransfer.getData("text/title"), responsible: "", id: new Date().getTime() }])
  }

  const changeTaskTitle = (id: number, title: string) => {
    const taskToChange = tasks.find(task => task.id == id)

    if (taskToChange) {
      const updatedTask = { ...taskToChange, title: title }

      const taskIndex = tasks.indexOf(taskToChange)

      if (taskIndex !== -1) {
        const updatedTasks = [...tasks]
        updatedTasks[taskIndex] = updatedTask

        setTasks(updatedTasks)
      }
    }
  }

  return (
    <section className={` max-w-xs w-full h-fit rounded ${props.bg50} p-2`} style={{ minWidth:"280px" }}>

      <div className=" flex items-center justify-between">
        <div className={` px-2 py-0.5 flex items-center ${props.bg200} rounded-full text-sm`}>
          <div className={` h-2 w-2 ${props.bg500} mr-2`} style={{ borderRadius: "50%" }}></div>
          <span>{props.name}</span>
        </div>
        <div className={` cursor-pointer p-1 flex justify-center items-center w-6 h-6`}
          onClick={handleAddTask}
          onMouseEnter={e => e.currentTarget.classList.add(props.bg100)}
          onMouseLeave={e => e.currentTarget.classList.remove(props.bg100)}
        >
          <i className={`fa-solid fa-plus ${props.text200}`}></i>
        </div>
      </div>

      <div className=" mt-1 p-2"
        onDragOver={handleDragOver}
        onMouseLeave={handleMouseLeave}
        onDrop={handleDrop}
      >
        {tasks.map((task, index) => {
          return (
            <Task id={task.id} key={index} changeTaskTitle={changeTaskTitle} deleteFunc={handleDeleteTask} title={task.title} responsible={task.responsible}/>
          )
        })}
      </div>

      <div className={`cursor-pointer px-2 py-0.5 ${props.text200} mt-2`} 
        onClick={handleAddTask}
        onMouseEnter={e => e.currentTarget.classList.add(props.bg100)}
        onMouseLeave={e => e.currentTarget.classList.remove(props.bg100)}
      >
        <i className={`fa-solid fa-plus pr-2`}></i>
        New
      </div>

    </section>
  )
}

export default Section