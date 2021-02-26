import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Sidebar from './Sidebar'
import Planning from './Planning'
import { useSelector, useDispatch } from "react-redux"
import { _setWorkspaceState, loadData } from './actions/tasks'



const Dashboard = () => {
  const projects = useSelector(state => state.tasks.projects) 
  const planning = useSelector(state => state.tasks.planning)
  const dispatch = useDispatch()

  console.log('projects', projects)
  console.log('planning', planning)
  
  useEffect(() => {
    dispatch(loadData())
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {
    dispatch(_setWorkspaceState(destination, source, draggableId))
  }
  return (
    <div className="flex h-screen bg-gray-100">
       <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Sidebar projects={projects}/>
        <Planning planning={planning}/>
      </DragDropContext>
    </div>
  )
}

export default Dashboard