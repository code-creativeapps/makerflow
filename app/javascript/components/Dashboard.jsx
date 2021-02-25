import React, { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Sidebar from './Sidebar'
import Planning from './Planning'
import moment from 'moment'
import { useSelector, useDispatch } from "react-redux"
import { incrementAsync } from './actions/tasks'

const DATA = {
  projects: [
    {
      id: 1,
      name: 'Makerflow',
      color: 'yellow-500',
      colorBase: 'yellow',
      colorShade: 500,
      milestones: [
        {
          id: 1,
          name: 'UX/UI',
          expanded: true,
          tasksIds: [1, 2, 3],
          tasks: [
            {
              id: 1,
              name: 'Write UX/UI Brief',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 1,
                name: 'Makerflow',
                color: 'yellow-500',
                colorBase: 'yellow',
                colorShade: 500,
              }
            },
            {
              id: 2,
              name: 'Create Job Offer',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 1,
                name: 'Makerflow',
                color: 'yellow-500',
                colorBase: 'yellow',
                colorShade: 500,
              }
            },
            {
              id: 3,
              name: 'Choose a designer',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 1,
                name: 'Makerflow',
                color: 'yellow-500',
                colorBase: 'yellow',
                colorShade: 500,
              }
            },
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Mindset Mobile App',
      color: 'green-400',
      colorBase: 'green',
      colorShade: 400,
      milestones: [
        {
          id: 2,
          name: 'Dev',
          expanded: true,
          tasksIds: [4, 5],
          tasks: [
            {
              id: 4,
              name: 'Implement Firebase Login',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 2,
                name: 'Mindset Mobile App',
                color: 'green-400',
                colorBase: 'green',
                colorShade: 400
              }
            },
            {
              id: 5,
              name: 'Publish on stores with Expo',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 2,
                name: 'Mindset Mobile App',
                color: 'green-400',
                colorBase: 'green',
                colorShade: 400
              }
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'SlackNewsletter',
      color: 'pink-600',
      colorBase: 'pink',
      colorShade: 600,
      milestones: [
        {
          id: 3,
          name: 'UX/UI',
          expanded: true,
          tasksIds: [6, 7, 8],
          tasks: [
            {
              id: 6,
              name: 'Write UX/UI Brief',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 3,
                name: 'SlackNewsletter',
                color: 'pink-600',
                colorBase: 'pink',
                colorShade: 600,
              }
            },
            {
              id: 7,
              name: 'Create Job Offer',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 3,
                name: 'SlackNewsletter',
                color: 'pink-600',
                colorBase: 'pink',
                colorShade: 600,
              } 
            },
            {
              id: 8,
              name: 'Choose a designer',
              date: null,
              completed: false,
              recurring: false,
              project: {
                id: 3,
                name: 'SlackNewsletter',
                color: 'pink-600',
                colorBase: 'pink',
                colorShade: 600,
              }
            }
          ]
        }
      ]
    },
  ],
  planning: [
    {
      id: "Monday",
      date: "02/22/2021",
      tasks: [
        {
          id: 9,
          name: 'Choose a designer',
          date: null,
          completed: false,
          recurring: false,
          total_minutes: 99,
          project_id: 1,
          project: {
            id: 1,
            name: 'Makerflow',
            color: 'yellow-500',
            colorBase: 'yellow',
            colorShade: 500,
          },
          notes: "Look for a designer on Upwork",
        }
      ]
    }
  ]
}

const Dashboard = () => {
  const [projects, setProjects] = useState(DATA.projects)
  const [planning, setPlanning] = useState(DATA.planning)
  const tasks = useSelector(state => state) 
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(incrementAsync())
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {

    console.log('source.droppableId', source.droppableId)
    console.log('destination.droppableId', destination.droppableId)

    if(!destination) {
      return
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if(destination.droppableId != source.droppableId) {
      const fromMilestones = ['1', '2', '3'].includes(source.droppableId)
      const toMilestones = ['1', '2', '3'].includes(destination.droppableId)
      const isDate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/
      // const toDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturaday'].includes(destination.droppableId)
      // const fromDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturaday'].includes(source.droppableId)
      // const toDays = [4, 5, 6, 7, 8, 9, 10].includes(destination.droppableId)
      // const fromDays = [4, 5, 6, 7, 8, 9, 10].includes(source.droppableId)
      const toDays = isDate.test(destination.droppableId)
      const fromDays = isDate.test(source.droppableId)

      console.log('droppableId', source.droppableId)
      // From Milestones to days =>
      if(fromMilestones && toDays) {
        // A. Remove Task from Project>Milestone
        // Return "concerned" project
        const selectedProject = projects.find(project => {
          return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
        })

        // 1. Remove taskId from taskIds
        // a. Copy milestone tasksIds
        const newTaskIds = Array.from(selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasksIds)
        // b. Remove taskId
        
        newTaskIds.splice(source.index, 1)
        // c. Change milestone taskIds
        const newMilestone = {
          ...selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]),
          tasksIds: newTaskIds
        }

        // 2. Replace Milestone in Project
        const newMilestones = Array.from(selectedProject.milestones)
        const milestoneIndex = selectedProject.milestones.findIndex(milestone => String(milestone.id) == [source.droppableId])
        newMilestones.splice(milestoneIndex, 1)
        newMilestones.splice(milestoneIndex, 0, newMilestone)
        
        const newProject = {
          ...selectedProject,
          milestones: newMilestones
        }

        // 3. Replace project in Projects
        const newProjects = Array.from(projects)//.filter(project => project.id != selectedProject.id)
        const projectIndex = projects.findIndex(project => project.id == selectedProject.id)
        newProjects.splice(projectIndex, 1)
        newProjects.splice(projectIndex, 0, newProject)
        setProjects(newProjects)

        // B. Add task to planning>day
        const draggedTask = selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasks
        .find(task => task.id == draggableId)
        // console.log('draggedTask', draggedTask)
        const newPlanning = Array.from(planning)
        const dayIndex = planning.findIndex(day => day.date == destination.droppableId)
        if (dayIndex == -1) {
          const newDay = {
            id: moment(destination.droppableId).format('dddd'),
            date: destination.droppableId,
            tasks: [draggedTask]
          }
          newPlanning.splice(dayIndex, 1)
          newPlanning.splice(dayIndex, 0, newDay)
        } else {
          const taskDay = planning.find(day => day.date == destination.droppableId)
          const newTasks = [...taskDay.tasks, draggedTask]
          const newDay = {
            ...taskDay,
            tasks: newTasks
          }
          newPlanning.splice(dayIndex, 1)
          newPlanning.splice(dayIndex, 0, newDay)
        }
        console.log('newPlanning', newPlanning)
        console.log('newProjects', newProjects)
        setPlanning(newPlanning)
      }
      // From days back to milestones <=
      else if(fromDays && toMilestones) {

      } 
      // From days to days >>
      else if(fromDays && toDays) {

      } 

      else if(fromMilestones && toMilestones) {
        // Return "concerned" project
        const selectedProject = projects.find(project => {
          return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
        })

        // 1. Reordering
        // a. Copy milestone tasksIds
        const newTaskIds = Array.from(selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasksIds)
        // b. Change order
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, parseInt(draggableId))
        // c. Change milestone taskIds
        const newMilestone = {
          ...selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]),
          tasksIds: newTaskIds
        }

        // 2. Replace Milestone in Project
        const newMilestones = Array.from(selectedProject.milestones)
        const milestoneIndex = selectedProject.milestones.findIndex(milestone => String(milestone.id) == [source.droppableId])
        newMilestones.splice(milestoneIndex, 1)
        newMilestones.splice(milestoneIndex, 0, newMilestone)
        
        const newProject = {
          ...selectedProject,
          milestones: newMilestones
        }

        // 3. Replace project in Projects
        const newProjects = Array.from(projects)//.filter(project => project.id != selectedProject.id)
        const projectIndex = projects.findIndex(project => project.id == selectedProject.id)
        newProjects.splice(projectIndex, 1)
        newProjects.splice(projectIndex, 0, newProject)
        setProjects(newProjects)
      }
    }
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