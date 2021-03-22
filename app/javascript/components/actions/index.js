import moment from 'moment'
import * as axios from 'axios'

import { 
  addProjectSuccess, 
  addProjectPending, 
  addProjectError,
  updateProjectError,
  updateProjectPending,
  updateProjectSuccess,
  deleteProjectError,
  deleteProjectPending,
  deleteProjectSuccess
 } from './projects'
 
import { 
  addMilestoneSuccess, 
  addMilestonePending, 
  addMilestoneError,
  updateMilestoneError,
  updateMilestonePending,
  updateMilestoneSuccess,
  deleteMilestoneError,
  deleteMilestonePending,
  deleteMilestoneSuccess
 } from './milestones'

import { 
  addTaskSuccess, 
  addTaskPending, 
  addTaskError,
  updateTaskError,
  updateTaskPending,
  updateTaskSuccess,
  deleteTaskError,
  deleteTaskPending,
  deleteTaskSuccess
 } from './tasks'

export const UPDATE_STATE = 'UPDATE_STATE'

export const OPEN_TASK = 'OPEN_TASK';
export const CLOSE_TASK = 'CLOSE_TASK';

export const ADD_TASK = 'ADD_TASK';

export const ADD_MILESTONE = 'ADD_MILESTONE';
export const UPDATE_MILESTONE = 'UPDATE_MILESTONE';
export const DELETE_MILESTONE = 'DELETE_MILESTONE';


// Moving items
export const FROM_MILESTONES_TO_DAYS = 'FROM_MILESTONES_TO_DAYS';
export const FROM_DAYS_TO_MILESTONES = 'FROM_DAYS_TO_MILESTONES';
export const FROM_DAYS_TO_DAYS = 'FROM_DAYS_TO_DAYS';
export const FROM_MILESTONES_TO_MILESTONES = 'FROM_MILESTONES_TO_MILESTONES';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';


// export const UPDATE_TASK = 'UPDATE_TASK';
// export const DELETE_TASK = 'DELETE_TASK';
// export const ADD_PROJECT = 'ADD_PROJECT';
// export const UPDATE_PROJECT = 'UPDATE_PROJECT';
// export const DELETE_PROJECT = 'DELETE_PROJECT';
// export const SET_PROJECT_COLOR = 'SET_PROJECT_COLOR';


export function fromMilestonesToDays(projectIndex, milestoneIndex, newTasksIds, newDay, dayIndex, draggedTaskIndex) {
  return {
    type: FROM_MILESTONES_TO_DAYS,
    projectIndex,
    milestoneIndex,
    newTasksIds,
    newDay,
    dayIndex,
    draggedTaskIndex
  };
}

export function fromDaysToDays(newDay, sourceDayIndex, destinationDayIndex, draggedTaskIndex) {
  return {
    type: FROM_DAYS_TO_DAYS,
    newDay,
    sourceDayIndex,
    destinationDayIndex,
    draggedTaskIndex,
  };
}
export function fromDaysToMilestones(sourceDayIndex, draggedTaskIndex, draggedTask, projectIndex, milestoneIndex) {
  return {
    type: FROM_DAYS_TO_MILESTONES,
    sourceDayIndex,
    draggedTaskIndex,
    draggedTask,
    projectIndex, 
    milestoneIndex
  };
}

export function fromMilestonesToMilestones(projectIndex, milestoneIndex) {
  return {
    type: FROM_MILESTONES_TO_MILESTONES,
    projectIndex,
    milestoneIndex,
    draggedTask, 
    draggedTaskIndex
  };
}
export function addTask(newTask, milestoneIndex, projectIndex) {
  return {
    type: ADD_TASK,
    newTask,
    milestoneIndex,
    projectIndex
  };
}

export function openTask(openedTask, showPanel = true) {
  return {
    type: OPEN_TASK,
    openedTask,
    showPanel
  };
}

export function updateState({projects, planning}) {
  return {
    type: UPDATE_STATE,
    projects,
    planning
  };
}

export function closeTask() {
  return {
    type: CLOSE_TASK
  };
}

export function deleteMilestone(milestoneIndex, projectIndex) {
  return {
    type: DELETE_MILESTONE,
    milestoneIndex,
    projectIndex
  };
}

export function addMilestone(newMilestone, projectIndex) {
  return {
    type: ADD_MILESTONE,
    newMilestone,
    projectIndex
  };
}

export function fetchDataPending() {
  return {
    type: FETCH_DATA_PENDING
  };
}
export function fetchDataSuccess({projects, planning}) {
  return {
    type: FETCH_DATA_SUCCESS,
    projects, 
    planning
  };
}
export function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    error
  };
}

// Initial hydrate
export function fetchData(userToken) {
  return(dispatch) => {
    // call API, POST new task, get object
    dispatch(fetchDataPending())
    axios.get('/api/v1/projects')
    .then((response) => {
      dispatch(fetchDataSuccess(response.data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(fetchDataError(error))
    })
  }
}

export function _addProject(projectName) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks

    dispatch(addProjectPending())
    // TODO: POST api call
    const newProject = {
      name: projectName,
      color: 'yellow-500',
      colorBase: 'yellow',
      colorShade: 500,
    }
    // call API, POST new task, get object
    axios.post(`/api/v1/projects/`, { project: newProject } )
    .then(({data}) => {
      dispatch(addProjectSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(addProjectError(error))
      // Resets to previous state
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _deleteProject(projectId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks

    dispatch(deleteProjectPending())

    // call API, POST new task, get object
    axios.delete(`/api/v1/projects/${projectId}`)
    .then(({data}) => {
      dispatch(deleteProjectSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(deleteProjectError(error))
      // Resets to previous state
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _updateProject(params, projectId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(updateProjectPending())
    // call API, POST new task, get object
    axios.put(`/api/v1/projects/${projectId}`, { project: params })
    .then((response) => {
      const { data } = response
      dispatch(updateProjectSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateProjectError(error))
      // Display error on the front-end
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _addMilestone(milestoneName, projectId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(addMilestonePending())
    // call API, POST new task, get object
    axios.post(`/api/v1/projects/${projectId}/milestones`, { milestone: { name: milestoneName } })
    .then((response) => {
      const { data } = response
      dispatch(addMilestoneSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(addMilestoneError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _updateMilestone(milestoneName, projectId, milestoneId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(updateMilestonePending())
    // call API, POST new task, get object
    axios.put(`/api/v1/projects/${projectId}/milestones/${milestoneId}`, { milestone: { name: milestoneName } })
    .then((response) => {
      const { data } = response
      dispatch(updateMilestoneSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(updateMilestoneError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _deleteMilestone(projectId, milestoneId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(deleteMilestonePending())
    // call API, POST new task, get object
    axios.delete(`/api/v1/projects/${projectId}/milestones/${milestoneId}`)
    .then((response) => {
      const { data } = response
      dispatch(deleteMilestoneSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(deleteMilestoneError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _addTask(taskName, milestoneId, projectId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(addTaskPending())
    // call API, POST new task, get object
    axios.post(`/api/v1/projects/${projectId}/milestones/${milestoneId}/tasks`, { task: { name: taskName } })
    .then((response) => {
      const { data } = response
      dispatch(addTaskSuccess())
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(addTaskError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}
export function _updateTask(taskName, taskId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(updateTaskPending())
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${taskId}`, { task: { name: taskName } })
    .then((response) => {
      const { data } = response
      dispatch(updateTaskSuccess())
      dispatch(updateState(data))
      dispatch(openTask(data.task))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(updateTaskError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _updateTaskNotes(taskNotes, taskId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(updateTaskPending())
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${taskId}`, { task: { notes: taskNotes } })
    .then((response) => {
      const { data } = response
      dispatch(updateTaskSuccess())
      dispatch(updateState(data))
      dispatch(openTask(data.task))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(updateTaskError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _checkTask(completed, taskId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(updateTaskPending())
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${taskId}`, { task: { completed } })
    .then((response) => {
      const { data } = response
      dispatch(updateTaskSuccess())
      dispatch(updateState(data))
      dispatch(openTask(data.task, false))
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(updateTaskError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _deleteTask(taskId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
  
    dispatch(deleteTaskPending())
    // call API, POST new task, get object
    axios.delete(`/api/v1/tasks/${taskId}`)
    .then((response) => {
      const { data } = response
      dispatch(deleteTaskSuccess())
      dispatch(updateState(data))
      dispatch(closeTask())
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Display error on the front-end
      dispatch(deleteMilestoneError(error))
      // Back to previous state 
      dispatch(updateState({planning, projects}))
    })
  }
}

// 

export function _fromDaysToMilestones(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks

    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [destination.droppableId])
    })

    const destinationMilestoneIndex = selectedProject.milestones.findIndex(milestone => `milestone-${milestone.id}` == [destination.droppableId])
    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [destination.droppableId])
    })
    const sourceDayIndex = planning.findIndex(day => day.date == source.droppableId)
    
    const draggedTaskIndex = planning[sourceDayIndex].tasks.findIndex(task => task.id == draggableId)
    const draggedTask = planning[sourceDayIndex].tasks[draggedTaskIndex]

    console.log('draggedTask', draggedTask)
  
    dispatch(fromDaysToMilestones(sourceDayIndex, draggedTaskIndex, draggedTask, selectedProjectIndex, destinationMilestoneIndex))
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${draggableId}`, { task: { date: null } })
    .then((response) => {
      const { data } = response
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _fromDaysToDays(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { planning, projects } = getState().tasks

    const sourceDayIndex = planning.findIndex(day => day.date == source.droppableId)
    const draggedTask = planning[sourceDayIndex].tasks.find(task => task.id == draggableId)
    const draggedTaskIndex = planning[sourceDayIndex].tasks.findIndex(task => task.id == draggableId)
    
    const destinationDayIndex = planning.findIndex(day => day.date == destination.droppableId)
    const newDay = {
      id: moment(destination.droppableId).format('DD/MM/YYYY'),
      date: destination.droppableId,
      tasks: [draggedTask]
    }
    dispatch(fromDaysToDays(newDay, sourceDayIndex, destinationDayIndex, draggedTaskIndex))
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${draggableId}`, { task: { date: destination.droppableId} })
    .then((response) => {
      const { data } = response
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _fromMilestonesToDays(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [source.droppableId])
    })
    
    const milestoneIndex = selectedProject.milestones.findIndex(milestone => `milestone-${milestone.id}` == [source.droppableId])
    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [source.droppableId])
    })

    const newTasksIds = Array.from(selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).tasks.map(t => t.id))
    newTasksIds.splice(source.index, 1)
    
    const draggedTask = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).tasks
    .find(task => task.id == draggableId)

    const draggedTaskIndex = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).tasks
    .findIndex(task => task.id == draggableId)

    const dayIndex = planning.findIndex(day => day.date == destination.droppableId)
    console.log('DAY INDEX', dayIndex)
    if (dayIndex == -1) {
      const newDay = {
        id: moment(destination.droppableId).format('DD/MM/YYYY'),
        date: destination.droppableId,
        tasks: [draggedTask]
      }
      dispatch(fromMilestonesToDays(selectedProjectIndex, milestoneIndex, newTasksIds, newDay, dayIndex))
    } else {
      const taskDay = planning.find(day => day.date == destination.droppableId)
      const newTasks = [...taskDay.tasks, draggedTask]
      const newDay = {
        ...taskDay,
        tasks: newTasks
      }
      dispatch(fromMilestonesToDays(selectedProjectIndex, milestoneIndex, newTasksIds, newDay, dayIndex, draggedTaskIndex))
    }
    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${draggableId}`, { task: { date: destination.droppableId} })
    .then((response) => {
      const { data } = response
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateState({planning, projects}))
    })
  }
}

function _fromMilestonesToMilestones(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects } = getState().tasks

    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [source.droppableId])
    })
    // const milestoneIndex = selectedProject.milestones.findIndex(milestone => `milestone-${milestone.id}` == [source.droppableId])
    const milestoneId = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).id
    const newMilestoneId = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [destination.droppableId]).id

    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => `milestone-${milestone.id}` == [source.droppableId])
    })

    // Reordering
    // const newTasksIds = Array.from(selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId].id.map(m => `milestone-${m.id}`)))
    // newTasksIds.splice(source.index, 1)
    // newTasksIds.splice(destination.index, 0, parseInt(draggableId))
    
    const draggedTask = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).tasks
    .find(task => task.id == draggableId)

    const draggedTaskIndex = selectedProject.milestones.find(milestone => `milestone-${milestone.id}` == [source.droppableId]).tasks
    .findIndex(task => task.id == draggableId)

    // dispatch(fromMilestonesToMilestones(selectedProjectIndex, milestoneIndex, draggedTask, draggedTaskIndex))
    // dispatch(fromMilestonesToMilestones(selectedProjectIndex, milestoneIndex, newTasksIds))

    // call API, POST new task, get object
    axios.put(`/api/v1/tasks/${draggableId}`, { task: { milestone_id: newMilestoneId} })
    .then((response) => {
      const { data } = response
      dispatch(updateState(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateState({planning, projects}))
    })
  }
}

export function _setWorkspaceState(destination, source, draggableId) {
  return (dispatch, getState) => {
    const { projects, planning } = getState().tasks

    if(!destination) {
      return
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if(destination.droppableId != source.droppableId) {
    }

    // TODO: Map milestones IDS
    // const fromMilestones = ['1', '2', '3'].includes(source.droppableId)
    // const toMilestones = ['1', '2', '3'].includes(destination.droppableId)
    const fromMilestones = source.droppableId.includes('milestone-')
    const toMilestones = destination.droppableId.includes('milestone-')
    const isDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
    // const isDate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/ <-- Old format MM/DD/YYYY
    const toDays = isDate.test(destination.droppableId)
    const fromDays = isDate.test(source.droppableId)

    // From Milestones to days =>
    if(fromMilestones && toDays) {
      dispatch(_fromMilestonesToDays(destination, source, draggableId))
    }
    // From days back to milestones <=
    else if(fromDays && toMilestones) {
      dispatch(_fromDaysToMilestones(destination, source, draggableId))
    } 
    // From days to days >>
    else if(fromDays && toDays) {
      if(destination.droppableId === source.droppableId) {
        return
      }
      dispatch(_fromDaysToDays(destination, source, draggableId))
      // dispatch a save to Database and dispatch redux state change on success
    } 
    else if(fromMilestones && toMilestones) {
      dispatch(_fromMilestonesToMilestones(destination, source, draggableId))
      // dispatch a save to Database and dispatch redux state change on success
    }
  }
}

// export function _addTask(taskName, milestone, project) {
  //   return(dispatch, getState) => {
  //     // call API, POST new task, get object
  //     const { projects } = getState().tasks
  //     const projectIndex = projects.findIndex(_project => {
  //       console.log('_project', _project)
  //       return _project.milestones.some(_milestone => String(_milestone.id) == milestone.id)
  //     })
  //     console.log('project', project)
  //     const milestoneIndex = project.milestones.findIndex(_milestone => String(_milestone.id) == milestone.id)
  //     const newTask = {
  //       name: taskName,
  //       date: null,
  //       completed: false,
  //       recurring: false,
  //       project
  //     }
  //     console.log('projectIndex', projectIndex)
  //     dispatch(addTask(newTask, milestoneIndex, projectIndex))
  //   }
  // }
  
// export function _setProjectColor(color, projectIndex) {
//   return(dispatch) => {
//     // call API, POST new task, get object
//     dispatch(setProjectColor(color, projectIndex))
//   }
// }

// export function loadData() {
//   return dispatch => {
//     console.log('incrementAsync')
//   };
// }

// export function setProjectColor(color, projectIndex) {
//   const [colorBase, colorShade] = color.split('-') 
//   return {
//     type: SET_PROJECT_COLOR,
//     color,
//     colorBase,
//     colorShade,
//     projectIndex
//   };
// }