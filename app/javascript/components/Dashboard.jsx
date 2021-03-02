import React, { useState, useEffect } from 'react'
import * as axios from 'axios'
import { DragDropContext } from 'react-beautiful-dnd'
import Sidebar from './Sidebar'
import Planning from './Planning'
import Details from './Details'
import { useSelector, useDispatch } from "react-redux"
import { _setWorkspaceState, fetchData, closeTask } from './actions/tasks'


const Dashboard = ({userToken}) => {
  axios.defaults.headers.common['Authorization'] = userToken;
  const projects = useSelector(state => state.tasks.projects) 
  const planning = useSelector(state => state.tasks.planning)
  const openedTask = useSelector(state => state.tasks.openedTask)
  const dispatch = useDispatch()
  
  const [isDragging, setIsDragging] = useState(false)
  
  useEffect(() => {
    dispatch(fetchData(userToken))
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {
    dispatch(_setWorkspaceState(destination, source, draggableId))
  }
  return (
    <div className="flex h-screen bg-gray-100">
       <DragDropContext onDragStart={() => setIsDragging(true)} onDragEnd={(result) => onDragEnd(result)}>
        <Sidebar projects={projects}/>
        <Planning isDragging={isDragging} planning={planning}/>
        <Details task={openedTask} closeTask={() => dispatch(closeTask())}/>
      </DragDropContext>
    </div>
  )
}

export default Dashboard