// Tasks
export const ADD_TASK_PENDING = 'ADD_TASK_PENDING';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';

export const DELETE_TASK_PENDING = 'DELETE_TASK_PENDING';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR';

export const UPDATE_TASK_PENDING = 'UPDATE_TASK_PENDING';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';

export function addTaskSuccess() {
    return {
      type: ADD_TASK_SUCCESS
    };
  }
  export function addTaskError(error) {
    return {
      type: ADD_TASK_ERROR,
      error
    };
  }
  export function addTaskPending() {
    return {
      type: ADD_TASK_PENDING
    };
  }

export function updateTaskSuccess() {
    return {
      type: UPDATE_TASK_SUCCESS
    };
  }

export function updateTaskError(error) {
  return {
    type: UPDATE_TASK_ERROR,
    error
  };
}

  
  export function updateTaskPending() {
    return {
      type: UPDATE_TASK_PENDING
    };
  }

  export function deleteTaskSuccess() {
    return {
      type: DELETE_TASK_SUCCESS,
      
    };
  }
  export function deleteTaskError(error) {
    return {
      type: DELETE_TASK_ERROR,
      error
    };
  }
  export function deleteTaskPending() {
    return {
      type: DELETE_TASK_PENDING,
    };
  }