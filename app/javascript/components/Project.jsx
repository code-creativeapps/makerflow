import React, { useState } from "react"
import Milestone from './Milestone'
import ColorPicker from './ColorPicker'
import { deleteProject, _addMilestone, _setProjectColor } from './actions/tasks'
import { useDispatch, useSelector } from "react-redux"

const Project = ({project}) => {
	const dispatch = useDispatch() 
	const [projectName, setProjectName] = useState(project.name)
	const [currentProjectId, setCurrentProjectId] = useState()
	const [edit, toggleEdition] = useState(false)
	const projects = useSelector(state => state.tasks.projects)
	const projectIndex = projects.findIndex(_project => _project.id == project.id)

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
		//   dispatch(_addTask(event.target.value, milestone, project))
			event.preventDefault()
			toggleEdition(false)
			return
		  	event.target.value = ''
		} else if (event.key === 'Escape') {
			event.preventDefault()
			toggleEdition(false)
			return
		}
	  }

	const handleKeyDownMilestone = (event) => {
		if (event.key === 'Enter') {
		  	dispatch(_addMilestone(event.target.value, projectIndex))
			event.target.value = ''
			return
		}
	  }

	const _deleteProject = () => {
		dispatch(deleteProject(projectIndex))
	}

	const changeColor = (color) => {
		dispatch(_setProjectColor(color, projectIndex))
		setCurrentProjectId(null)
	}

 	return (
		<div>
			{/* Color select + Name + Update icon */}
			<div className="flex items-center justify-between mb-4 group">
				{ edit ? (
					<input
						className="text-lg font-medium text-gray-700 border-none resize-none focus:p-0 focus:border-2 focus:border-gray-600 focus:outline-none focus:ring-0"
						type="text"
						name="task"
						autoFocus
						autoCorrect="false"
						autoComplete="false"
						autoCapitalize="true"
						spellCheck="false"
						placeholder="Edit the project name"
						onChange={e => setProjectName(e.target.value)}
						value={projectName}
						onKeyDown={handleKeyDown}
						onBlur={() => toggleEdition(false)}
					/>
				) : (
					<h3 className="flex items-center text-lg font-medium text-gray-700"><div onClick={() => setCurrentProjectId(project.id)} className={`w-4 h-4 mr-4 bg-${project.color} rounded-full cursor-pointer`}></div>{project.name}</h3>
				)}
				
				{ !edit && (
					<div class="flex cursor-pointer">
						<svg onClick={() => toggleEdition(true)} className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
						<svg onClick={() => { if (window.confirm('Are you sure you want to delete this project?')) _deleteProject()}} className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
					</div>
				)}
			</div>
			<ColorPicker currentProjectId={currentProjectId} changeColor={changeColor} project={project}/>
			{/* Milestones */}
			<div>
				{ project.milestones.map((milestone) => (
					<Milestone milestone={milestone} project={project}/>
				))}
				{/* Add Milestone */}
            
				<h4 className="flex items-center mt-2 text-base font-normal text-gray-400">
					<div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
						<button className="flex items-center justify-center w-4 h-4 font-semibold text-white bg-gray-400 rounded-full focus:outline-none">
							<p>
							<svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
							</svg>
							</p>
						</button>
					</div>
					<input onKeyDown={handleKeyDownMilestone} className="placeholder-gray-400 capitalize outline-none placeholder:font-normal" placeholder="Add a Milestone"/> 
				</h4>
			</div>
		</div>
	)
}

export default Project