import React from "react"
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { _addTask } from './actions/tasks'
import { useDispatch, useSelector } from "react-redux"

const Milestone = ({milestone, project}) => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.tasks.projects) 

  const handleKeyDown = (event) => {
    console.log('pss')
    if (event.key === 'Enter') {
      dispatch(_addTask(event.target.value, milestone, project))
      event.target.value = ''
    }
  }
  const tasks = project.milestones.find(_milestone => _milestone.id == milestone.id).tasks

  // const tasks =  milestone.tasksIds.map((taskId, i) => milestone.tasks.find((task) => task.id == taskId)) TODO: Add Ordering
  return (
    <Droppable droppableId={String(milestone.id)}>
      {
        (provided) => (
          <div {...provided.droppableProps} innerRef={provided.innerRef} ref={provided.innerRef}>
            <div className="flex items-center justify-between mb-2 space-x-2 opacity-100 group group-focus:opacity-0">
              <h4 className="flex items-center text-base font-normal text-gray-400">
                <button className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full focus:outline-none group">
                  <div style={{borderTop: "5px solid white"}} className="w-0 h-0 border-t border-b-0 border-transparent border-solid border-5"></div>
                </button>
                {milestone.name}
              </h4>
              {/* Progress Bar */}
              {/* <div className="w-full bg-gray-500"><div className="w-3/4 p-1 text-xs font-semibold text-center bg-yellow-400"><p className="text-white">72%</p></div></div> */}
              <button className={`focus:outline-none opacity-0 group-hover:opacity-100 flex items-center justify-center w-4 h-4 bg-${project.color} rounded-full pb-0.5 text-white font-semibold`}><p>+</p></button>
            </div>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index}/>
            ))}
          { provided.placeholder }
          <input onKeyDown={handleKeyDown} placeholder="Add a new task in UX/UI..." className={`w-full p-2 my-2 text-sm font-semibold text-${project.color} placeholder-${project.color} bg-white border-2 border-${project.colorBase}-${project.colorShade - 100} rounded shadow-sm outline-none focus:bg-${project.colorBase}-${project.colorShade + 100} focus:text-white focus:placeholder-white`}/>
            {/* Add Milestone */}
            <h4 className="flex items-center mt-2 text-base font-normal text-gray-400">
              <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                <button className="focus:outline-none flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
              </div>
              <input className="placeholder-gray-400 capitalize outline-none placeholder:font-normal" placeholder="Add a Milestone"/>
            </h4>
          </div>
        )
      }
      
    </Droppable>
  )
}

export default Milestone