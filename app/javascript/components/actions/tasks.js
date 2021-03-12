import moment from 'moment'
import * as axios from 'axios'
export const OPEN_TASK = 'OPEN_TASK';
export const CLOSE_TASK = 'CLOSE_TASK';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';

export const ADD_MILESTONE = 'ADD_MILESTONE';
export const UPDATE_MILESTONE = 'UPDATE_MILESTONE';
export const DELETE_MILESTONE = 'DELETE_MILESTONE';

export const ADD_PROJECT = 'ADD_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const SET_PROJECT_COLOR = 'SET_PROJECT_COLOR';

export const FROM_MILESTONES_TO_DAYS = 'FROM_MILESTONES_TO_DAYS';
export const FROM_DAYS_TO_MILESTONES = 'FROM_DAYS_TO_MILESTONES';
export const FROM_DAYS_TO_DAYS = 'FROM_DAYS_TO_DAYS';
export const FROM_MILESTONES_TO_MILESTONES = 'FROM_MILESTONES_TO_MILESTONES';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';

export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS';
export const SAVE_DATA_PENDING = 'SAVE_DATA_PENDING';
export const SAVE_DATA_ERROR = 'SAVE_DATA_ERROR';


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

export function fromMilestonesToMilestones(projectIndex, milestoneIndex, newTasksIds) {
  return {
    type: FROM_MILESTONES_TO_MILESTONES,
    projectIndex,
    milestoneIndex,
    newTasksIds
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

export function openTask(openedTask) {
  return {
    type: OPEN_TASK,
    openedTask
  };
}

export function updateTask({projects, planning}) {
  return {
    type: UPDATE_TASK,
    projects,
    planning
  };
}

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    error
  };
}

export function closeTask() {
  return {
    type: CLOSE_TASK
  };
}

export function deleteProject(projectIndex) {
  return {
    type: DELETE_PROJECT,
    projectIndex
  };
}

export function addProject(newProject) {
  return {
    type: ADD_PROJECT,
    newProject
  };
}
export function setProjectColor(color, projectIndex) {
  const [colorBase, colorShade] = color.split('-') 
  return {
    type: SET_PROJECT_COLOR,
    color,
    colorBase,
    colorShade,
    projectIndex
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

export function _setProjectColor(color, projectIndex) {
  return(dispatch) => {
    // call API, POST new task, get object
    dispatch(setProjectColor(color, projectIndex))
  }
}

export function _addProject(projectName) {
  return(dispatch, getState) => {
    // TODO: POST api call
    const newProject = {
      id: 5, // ID from POST api call
      name: projectName,
      color: 'yellow-500',
      colorBase: 'yellow',
      colorShade: 500,
      milestones: []
    }
    dispatch(addProject(newProject))
  }
}

export function _addMilestone(milestoneName, projectIndex) {
  return(dispatch, getState) => {
    // TODO: POST api call
    const newMilestone = {
      id: 4, // ID from POST api call
      name: milestoneName,
      expanded: true,
      tasksIds: [],
      tasks: []
    }
    dispatch(addMilestone(newMilestone, projectIndex))
  }
}

export function _addTask(taskName, milestone, project) {
  return(dispatch, getState) => {
    // call API, POST new task, get object
    const { projects } = getState().tasks
    const projectIndex = projects.findIndex(_project => {
      console.log('_project', _project)
      return _project.milestones.some(_milestone => String(_milestone.id) == milestone.id)
    })
    console.log('project', project)
    const milestoneIndex = project.milestones.findIndex(_milestone => String(_milestone.id) == milestone.id)
    const newTask = {
      name: taskName,
      date: null,
      completed: false,
      recurring: false,
      project
    }
    console.log('projectIndex', projectIndex)
    dispatch(addTask(newTask, milestoneIndex, projectIndex))
  }
}

export function _fromDaysToMilestones(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks

    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => String(milestone.id) == [destination.droppableId])
    })

    const destinationMilestoneIndex = selectedProject.milestones.findIndex(milestone => String(milestone.id) == [destination.droppableId])
    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => String(milestone.id) == [destination.droppableId])
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
      dispatch(updateTask(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateTask({planning, projects}))
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
      dispatch(updateTask(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateTask({planning, projects}))
    })
  }
}

export function _fromMilestonesToDays(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects, planning } = getState().tasks
    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
    })
    
    const milestoneIndex = selectedProject.milestones.findIndex(milestone => String(milestone.id) == [source.droppableId])
    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
    })

    const newTasksIds = Array.from(selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasks.map(t => t.id))
    newTasksIds.splice(source.index, 1)
    
    const draggedTask = selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasks
    .find(task => task.id == draggableId)

    const draggedTaskIndex = selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasks
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
      dispatch(updateTask(data))
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateTaskError(error))
      // Display error on the front-end
      dispatch(updateTask({planning, projects}))
    })
  }
}

function _fromMilestonesToMilestones(destination, source, draggableId) {
  return(dispatch, getState) => {
    const { projects } = getState().tasks

    const selectedProject = projects.find(project => {
      return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
    })
    const milestoneIndex = selectedProject.milestones.findIndex(milestone => String(milestone.id) == [source.droppableId])

    const selectedProjectIndex = projects.findIndex(project => {
      return project.milestones.some(milestone => String(milestone.id) == [source.droppableId])
    })

    // Reordering
    const newTasksIds = Array.from(selectedProject.milestones.find(milestone => String(milestone.id) == [source.droppableId]).tasksIds)
    newTasksIds.splice(source.index, 1)
    newTasksIds.splice(destination.index, 0, parseInt(draggableId))
    
    dispatch(fromMilestonesToMilestones(selectedProjectIndex, milestoneIndex, newTasksIds))
  }
}

export function _setWorkspaceState(destination, source, draggableId) {
  return (dispatch, getState) => {
    const { tasks } = getState()

    if(!destination) {
      return
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if(destination.droppableId != source.droppableId) {
    }

    const fromMilestones = ['1', '2', '3'].includes(source.droppableId)
    const toMilestones = ['1', '2', '3'].includes(destination.droppableId)
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
  
  export function loadData() {
    return dispatch => {
      console.log('incrementAsync')
    };
  }