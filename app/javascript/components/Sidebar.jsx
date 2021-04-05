import React, { useState } from "react"
import Project from './Project'
import { _addProject } from './actions'
import { useDispatch } from "react-redux"

const Sidebar = ({projects}) => {
    const dispatch = useDispatch()
	const [edit, toggleEdition] = useState(false)
    const handleKeyDownMilestone = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            dispatch(_addProject(event.target.value))
            toggleEdition(false)
            return
        } else if (event.key === 'Escape') {
            event.preventDefault()
            toggleEdition(false)
            return
        }
      }
    
    return (
        <div className="w-1/4 p-2 overflow-hidden overflow-y-auto bg-white border border-gray-300">
            { edit ? (
                <input 
                    className="w-full mb-8 text-xl font-semibold text-gray-600 border-none resize-none focus:m-0 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0"
                    placeholder="New project..."
                    autoFocus
                    autoCorrect="false"
                    autoComplete="false"
                    autoCapitalize="true"
                    spellCheck="false"
                    onKeyDown={handleKeyDownMilestone}
                    onBlur={() => toggleEdition(false)}
                />
            ) : (
                <h2 className="flex items-center justify-between mb-8 text-xl font-semibold text-gray-600">Projects<button onClick={() => toggleEdition(!edit)} className="flex items-center justify-center w-4 h-4 text-base font-semibold text-white bg-gray-600 rounded-full focus:outline-none">
                    <p class="new-project">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    </p>
                    </button>
                </h2>
            )}
            {/* Projects */}
            <div className="space-y-8">
                { projects.map((project) => (
                <Project project={project}/> 
                ))}
            </div>
        </div>
    )
}

export default Sidebar