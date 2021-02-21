import React from "react"
import Project from './Project'

const Sidebar = ({projects}) => (
    <div className="w-1/4 p-2 overflow-y-scroll bg-white border border-gray-300">
        <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">Projects<button className="focus:outline-none flex text-base items-center justify-center w-4 h-4 bg-gray-600 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button></h2>
        {/* Projects */}
        <div className="space-y-8">
            { projects.map((project) => (
            <Project project={project}/> 
            ))}
        </div>
    </div>
)

export default Sidebar