import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { _deleteTask, _updateTask, _updateTaskNotes } from './actions'

const PlayTaskButton = () => (
    <div class="cursor-pointer mt-5 border-2 border-gray-400 rounded-full shadow-md p-0 flex w-8 h-8 items-center justify-center group hover:bg-gray-500">
        <svg className="w-5 text-gray-400 group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
)
const PauseTaskButton = () => (
    <div class="cursor-pointer mt-5 border-2 border-gray-400 rounded-full shadow-md p-0 flex w-8 h-8 items-center justify-center group hover:bg-gray-500">
       <svg className="w-5 text-gray-400 group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
)

const Details = ({task, showPanel, closeTask}) => {
    const dispatch = useDispatch()

    const DeleteTaskButton = () => (
        <div onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) dispatch(_deleteTask(task.id))}} class="cursor-pointer mt-5 border-2 border-gray-400 rounded-full shadow-md p-0 flex w-8 h-8 items-center justify-center group hover:bg-gray-500">
            <svg className="w-5 text-gray-400 group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    )

    const [taskName, setTaskName] = useState(task?.name || "");
    const [taskNotes, setTaskNotes] = useState(task?.notes || "");
    
    
    useEffect(() => {
        setTaskName(task?.name)
        setTaskNotes(task?.notes)
    }, [task])

    const updateTaskName = (newTaskName) => {
        setTaskName(newTaskName)
        dispatch(_updateTask(newTaskName, task.id))
    }
    const updateTaskNotes = (newTaskNotes) => {
        setTaskNotes(newTaskNotes)
        dispatch(_updateTaskNotes(newTaskNotes, task.id))
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => dispatch(_updateTaskNotes(taskNotes, task.id)), 500);
        return () => clearTimeout(timeOutId);
      }, [taskNotes]);
    
    if (task != null && showPanel) {
        return(
            <div className={`absolute h-full right-0 w-1/4 ${task === null ? 'hidden' : 'visible'} p-3 overflow-y-auto transition-opacity duration-500 ease-in-out bg-white border border-gray-300`}>
                <div class="flex items-center justify-between">
                    <textarea
                        className={`h-auto p-0 text-2xl font-semibold text-gray-600 border-none resize-none focus:p-2 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0 ${task.completed && 'line-through'}`}
                        type="text"
                        name="task"
                        placeholder="Edit the task name"
                        onChange={e => updateTaskName(e.target.value)}
                        value={taskName}
                    />
                            
                    <svg onClick={closeTask} className="w-4 text-gray-600 cursor-pointer"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="flex items-center justify-between mt-2 mb-4 group">
                    <h3 className="flex items-center text-base font-normal text-gray-600"><div className={`w-3 h-3 mr-2 bg-${task.project.color} rounded-full`}></div>{task.project.name}</h3>
                    <h4 className="flex items-center text-base font-normal text-gray-400">{task.milestone.name}</h4>
                </div>
                {/* Projects */}
                <div className="w-full mt-10">
                    <h3 className="text-base font-semibold text-gray-600">Notes</h3>
                    <textarea
                        className="w-full h-24 p-3 mt-2 text-sm text-gray-500 placeholder-gray-400 bg-gray-100 border-none rounded resize-none t focus:p-2 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0"
                        type="text"
                        name="task"
                        placeholder="Add some notes to this task..."
                        onChange={e => setTaskNotes(e.target.value)}
                        value={taskNotes}
                    />
                    <h3 className="mt-5 text-base font-semibold text-gray-600">Actions</h3>
                    <div className="flex space-x-2">
                        {/* <PlayTaskButton/> */}
                        {/* <PauseTaskButton/> */}
                        <DeleteTaskButton/>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}  

export default Details