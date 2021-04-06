import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from 'react-redux'
import { _deleteTask, _updateTask, _updateTaskNotes, _addSubTask, _updateSubTask, _deleteSubTask, _checkSubTask } from './actions'

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
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(_addSubTask(event.target.value, task?.id))
            event.target.value = ''
        }
    }
    const dispatch = useDispatch()

    const DeleteTaskButton = () => (
        <div onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) dispatch(_deleteTask(task.id))}} class="cursor-pointer mt-5 border-2 border-gray-400 rounded-full shadow-md p-0 flex w-8 h-8 items-center justify-center group hover:bg-gray-500">
            <svg className="w-5 text-gray-400 group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    )

    const [newSubTask, addNewSubTask] = useState('');
    const [taskName, setTaskName] = useState(task?.name);
    const [taskNotes, setTaskNotes] = useState(task?.notes);

    const updateSubTask = (subTaskName, subTaskId) => {
        const timeOutId = setTimeout(() => dispatch(_updateSubTask(subTaskName, subTaskId)), 500);
        return () => clearTimeout(timeOutId);
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => dispatch(_updateTask(taskName, task.id)), 500);
        return () => clearTimeout(timeOutId);
    }, [taskName])

    useEffect(() => {
        const timeOutId = setTimeout(() => dispatch(_updateTaskNotes(taskNotes, task.id)), 500);
        return () => clearTimeout(timeOutId);
    }, [taskNotes])

    
    if (task != null && showPanel) {
        return(
            <div className={`absolute h-full right-0 w-1/4 ${task === null ? 'hidden' : 'visible'} p-3 overflow-y-auto transition-opacity duration-500 ease-in-out bg-white border border-gray-300`}>
                <svg onClick={closeTask} className="absolute right-0 w-4 text-gray-600 cursor-pointer"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div class="flex items-center justify-between">
        
                    <textarea
                        className={`h-auto p-0 text-2xl font-semibold text-gray-600 border-none resize-none focus:p-2 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0 ${task.completed && 'line-through'}`}
                        type="text"
                        name="task"
                        placeholder="Edit the task name"
                        onChange={e => setTaskName(e.target.value)}
                        value={taskName ? taskName : task.name }
                    />
                            
                    
                </div>
                <div className="flex items-center justify-between mt-2 mb-4 group">
                    <h3 className="flex items-center text-base font-normal text-gray-600"><div className={`w-3 h-3 mr-2 bg-${task.project.color} rounded-full`}></div>{task.project.name}</h3>
                    <h4 className="flex items-center text-base font-normal text-gray-400">{task.milestone.name}</h4>
                </div>
                {/* Projects */}
                <div className="w-full mt-5 space-y-4">
                    <div>
                        <h3 className="text-base font-semibold text-gray-600">Sub-tasks</h3>
    
                        <div class="space-y-4 py-4">
                            {task.sub_tasks.map((subTask) => <div class="flex items-center space-x-2 group">
                                <input class="text-gray-600 form-checkbox" type="checkbox" defaultChecked={subTask.completed} onChange={e => dispatch(_checkSubTask(e.target.checked, subTask.id))}/>
                                <input type="text" className="w-full p-0 text-base border-none focus:outline-none focus:ring-0" onChange={e => updateSubTask(e.target.value, subTask.id)} defaultValue={subTask.name}/>
                                <svg onClick={() => dispatch(_deleteSubTask(subTask.id))} className="w-5 text-gray-400 opacity-0 justify-self-end group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>)}
                            <div class="flex items-center space-x-2">
                                <input type="checkbox" class="form-checkbox" checked={false} disabled/>
                                <input 
                                    className="w-full text-base text-gray-500 focus:outline-none focus:ring-0" 
                                    placeholder={`Add a new sub-task`}
                                    onChange={e => addNewSubTask(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-600">Notes</h3>
                        <textarea
                            className="w-full h-24 p-3 mt-2 text-sm text-gray-500 placeholder-gray-400 bg-gray-100 border-none rounded resize-none t focus:p-2 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0"
                            type="text"
                            name="taskNotes"
                            placeholder="Add some notes to this task..."
                            onChange={e => setTaskNotes(e.target.value)}
                            value={taskNotes ? taskNotes : (task.notes ? task.notes : '')}
                        />
                    </div>
                    <div>
                        <h3 className="mt-5 text-base font-semibold text-gray-600">Actions</h3>
                        <div className="flex space-x-2">
                            {/* <PlayTaskButton/> */}
                            {/* <PauseTaskButton/> */}
                            <DeleteTaskButton/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}  

export default Details