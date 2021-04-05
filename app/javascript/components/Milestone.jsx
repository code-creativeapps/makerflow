import React, { useState, useEffect } from "react"
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { _addTask, _deleteMilestone, _updateMilestone } from './actions'
import { useDispatch, useSelector } from "react-redux"

const Milestone = ({milestone, project}) => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.tasks.projects) 
  const [isOpen, toggleIsOpen] = useState(milestone.expanded)
  const [milestoneName, setMilestoneName] = useState(milestone.name)
	const [edit, toggleEdition] = useState(false)
	const [addTask, toggleAddTask] = useState(false)
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      dispatch(_addTask(event.target.value, milestone.id, project.id))
      event.target.value = ''
    }
  }
  const handleKeyDownMilestone = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      dispatch(_updateMilestone(event.target.value, project.id, milestone.id))
			toggleEdition(false)
      return
    } else if (event.key === 'Escape') {
			event.preventDefault()
			toggleEdition(false)
			return
		}
  }

  const computeColor = () => {
    return project.colorBase != 'black' ? project.colorBase + '-' + project.colorShade : 'black'
  }

  useEffect(() => {
    if (addTask) {
      toggleIsOpen(true)
    }
  }, [addTask])

  const tasks = project.milestones.find(_milestone => _milestone.id == milestone.id).tasks

  // const tasks =  milestone.tasksIds.map((taskId, i) => milestone.tasks.find((task) => task.id == taskId)) TODO: Add Ordering
  return (
    <Droppable droppableId={`milestone-${milestone.id}`}>
      {
        (provided) => (
          <div {...provided.droppableProps} innerRef={provided.innerRef} ref={provided.innerRef}>
            <div className="flex items-center justify-between mb-2 space-x-2 opacity-100 group group-focus:opacity-0">
              <h4 className={`flex items-center text-base font-normal text-gray-400 ${!isOpen && 'italic'}`}>
                <button onClick={() => toggleIsOpen(!isOpen)} className="flex items-center justify-center h-4 mr-2 bg-gray-400 rounded-full min-w-4 focus:outline-none group">
                  <div style={isOpen ? {borderTop: "5px solid white"} : {borderLeft: "5px solid white"}} className={`w-0 h-0 ${isOpen ? 'border-t border-b-0 border-transparent' : 'ml-0.5 border-l border-r-0 border-transparent'} border-solid border-5`}></div>
                </button>
                { edit ? (
                  <input
                    className="p-0 border-none resize-none focus:m-0 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0"
                    type="text"
                    name="task"
                    placeholder="Edit the milestone name"
                    autoFocus
						        autoCorrect="false"
                    autoComplete="false"
                    autoCapitalize="true"
                    spellCheck="false"
                    onKeyDown={handleKeyDownMilestone}
                    onBlur={() => toggleEdition(false)}
                    onChange={e => setMilestoneName(e.target.value)}
                    value={milestoneName}
                  />
                ) : (
                  milestoneName
                ) 
                }
              </h4>
              {/* Progress Bar */}
              {/* <div className="w-full bg-gray-500"><div className="w-3/4 p-1 text-xs font-semibold text-center bg-yellow-400"><p className="text-white">72%</p></div></div> */}
              {/* <button className={`focus:outline-none opacity-0 group-hover:opacity-100 flex items-center justify-center w-4 h-4 bg-${project.color} rounded-full pb-0.5 text-white font-semibold`}><p>+</p></button> */}
              { !edit && (
                <div class="flex cursor-pointer">
                  
                  <svg onClick={() => toggleEdition(true)} className="w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <svg onClick={() => { if (window.confirm('Are you sure you want to delete this milestone?')) dispatch(_deleteMilestone(project.id, milestone.id))}} className="w-4 text-gray-400 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <svg onClick={() => toggleAddTask(true)} className={`ml-1 w-4 h-4 rounded-lg text-white bg-${computeColor()}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div class="ml-2">
              {isOpen && tasks.filter(task => task.date == null).map((task, index) => (
                <Task key={task.id} task={task} index={index} project={project}/>
              ))}

            </div>
          { provided.placeholder }
          { isOpen && addTask && (
            <div class={`ml-2 flex new-task justify-between px-2 py-1 mb-2 text-xs font-semibold text-${project.color} placeholder-${project.color} bg-white border-2 ${project.colorBase != 'black' ? `border-${project.colorBase}-${project.colorShade - 100}` : 'border-black'}  rounded shadow-sm outline-none ${project.colorBase != 'black' ? `focus:bg-${project.colorBase}-${project.colorShade + 100}` : 'focus:bg-black'}  focus:text-white focus:placeholder-white`}>
              <input onKeyDown={handleKeyDown} placeholder={`Add a new task in ${milestone.name}...`} className={`border-0 outline-none flex-grow-1 font-medium`}/>
              <svg onClick={() => toggleAddTask(false)} className="w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
            {/* <h4 className={`flex items-center ml-2 mb-2 text-sm font-normal text-${computeColor()}`}>
              <div className={`flex items-center justify-center w-4 h-4 mr-2 bg-gray-300 rounded-full`}>
                <button className={`flex items-center justify-center w-4 h-4 font-semibold text-white bg-${computeColor()} rounded-full focus:outline-none`}>
                  <p>
                  <svg className={`w-4 h-4 text-white rounded-lg bg-${computeColor()} bg-opacity-50`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  </p>
                </button>
              </div>
              <input onKeyDown={handleKeyDownMilestone} className={`placeholder-${computeColor()} outline-none font-semibold placeholder:font-semibold opacity-50`} placeholder="Add a task"/> 
            </h4> */}
          </div>
        )
      }
      
    </Droppable>
  )
}

export default Milestone