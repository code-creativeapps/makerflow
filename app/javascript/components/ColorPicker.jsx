import React from 'react'

const colors = [
    'red-500',
    'yellow-500',
    'green-500',
    'blue-500',
    'indigo-500',
    'purple-500',
    'pink-500',
    'black',
]

const ColorPicker = ({changeColor, project, currentProjectId}) => {
    { 
        return currentProjectId == project.id ? (
            <div class="flex mb-5 space-x-4">
                { colors.map((color) => <div onClick={() => changeColor(color)} className={`w-4 h-4 bg-${color} cursor-pointer rounded-full`}></div>) }
            </div>
        ) : null
    }
}

export default ColorPicker