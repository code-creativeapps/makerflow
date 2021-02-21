import React from "react"
import Milestone from './Milestone'

const Project = ({project}) => (
	<div>
		{/* Color select + Name + Update icon */}
		<div className="flex items-center justify-between mb-4 group">
			<h3 className="flex items-center text-lg font-medium text-gray-700"><div className={`w-4 h-4 mr-4 bg-${project.color} rounded-full`}></div>{project.name}</h3>
			<svg className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
			</svg>
		</div>
		{/* Milestones */}
		<div>
			{ project.milestones.map((milestone) => (
				<Milestone milestone={milestone} project={project}/>
			))}
		</div>
	</div>
)

export default Project