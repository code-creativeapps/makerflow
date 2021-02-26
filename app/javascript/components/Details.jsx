import React from "react"

const Details = ({task, closeTask}) => (
    <div className={`absolute h-full right-0 w-1/4 ${task === null ? 'hidden' : 'visible'} p-2 overflow-y-auto transition-display-visible duration-500 ease-in-out bg-white border border-gray-300`}>
        <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">{task?.name}
            <svg onClick={closeTask} className="w-4 text-gray-600 cursor-pointer"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg> 
        </h2>
        {/* Projects */}
        <div className="space-y-8">
           
        </div>
    </div>
)

export default Details