import React from "react"

const Task = ({task}) => (
    <div className={`flex justify-between p-2 my-2 text-sm font-semibold text-white bg-${task.project.color} rounded shadow-sm group`}>{task.name}
      <svg className="w-5 text-white opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    </div>
)
export default Task