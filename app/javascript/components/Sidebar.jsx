import React, { useState } from "react"
import Project from './Project'
import { _addProject } from './actions/tasks'
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
        <div className="w-1/4 p-2 overflow-y-auto bg-white border border-gray-300">
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
                <h2 className="flex items-center justify-between mb-8 text-xl font-semibold text-gray-600">Projects<button onClick={() => toggleEdition(!edit)} className="focus:outline-none flex text-base items-center justify-center w-4 h-4 bg-gray-600 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button></h2>
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