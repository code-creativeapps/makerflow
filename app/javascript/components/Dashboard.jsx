import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Sidebar from './Sidebar'
import Planning from './Planning'
import Details from './Details'
import { useSelector, useDispatch } from "react-redux"
import { _setWorkspaceState, loadData, closeTask } from './actions/tasks'

const Dashboard = () => {
  const projects = useSelector(state => state.tasks.projects) 
  const planning = useSelector(state => state.tasks.planning)
  const openedTask = useSelector(state => state.tasks.openedTask)
  const dispatch = useDispatch()
  
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
        <Details task={openedTask} closeTask={() => dispatch(closeTask())}/>
      </DragDropContext>
    </div>
  )
}

export default Dashboard