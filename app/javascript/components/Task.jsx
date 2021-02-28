import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { openTask } from './actions/tasks'

const Task = ({ task, project, index }) => {
    const dispatch = useDispatch()
    const [checked, check] = useState(false)
    const _project = project || task.project

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {
                (provided, snapshot) => (
                    <div 
                        {...task.date != null && {onClick: () => dispatch(openTask(task))}} 
                        {...provided.draggableProps} {...provided.dragHandleProps} 
                        innerRef={provided.innerRef} ref={provided.innerRef} 
                        className={`
                            flex max-h-20 items-center text-center justify-between p-2 my-2 text-sm font-semibold
                            text-white  
                            rounded shadow-sm group ${snapshot.isDragging && 'opacity-50'} 
                            ${(checked && task.date != null) ? `bg-${_project.colorBase}-${_project.colorShade - 100} line-through hover:bg-${_project.colorBase}-${_project.colorShade - 100}`
                            : `bg-${_project.color} hover:bg-${_project.colorBase}-${_project.colorShade + 100}`}`
                        }
                        >
                            {task.name}
                            { task.date != null && 
                                ( checked ? (
                                    <svg onClick={() => check(!checked)} className="w-5 text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg onClick={() => check(!checked)} className="w-5 text-white opacity-0 cursor-pointer group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                                )
                            }
                            
                    </div>
                )
            }
        </Draggable>
    )
}
export default Task