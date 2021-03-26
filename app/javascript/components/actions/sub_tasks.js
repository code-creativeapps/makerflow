// Tasks
export const ADD_SUBTASK_PENDING = 'ADD_SUBTASK_PENDING';
export const ADD_SUBTASK_SUCCESS = 'ADD_SUBTASK_SUCCESS';
export const ADD_SUBTASK_ERROR = 'ADD_SUBTASK_ERROR';

export const DELETE_SUBTASK_PENDING = 'DELETE_SUBTASK_PENDING';
export const DELETE_SUBTASK_SUCCESS = 'DELETE_SUBTASK_SUCCESS';
export const DELETE_SUBTASK_ERROR = 'DELETE_SUBTASK_ERROR';

export const UPDATE_SUBTASK_PENDING = 'UPDATE_SUBTASK_PENDING';
export const UPDATE_SUBTASK_SUCCESS = 'UPDATE_SUBTASK_SUCCESS';
export const UPDATE_SUBTASK_ERROR = 'UPDATE_SUBTASK_ERROR';

export function addSubTaskSuccess() {
    return {
      type: ADD_SUBTASK_SUCCESS
    };
  }
  export function addSubTaskError(error) {
    return {
      type: ADD_SUBTASK_ERROR,
      error
    };
  }
  export function addSubTaskPending() {
    return {
      type: ADD_SUBTASK_PENDING
    };
  }

export function updateSubTaskSuccess() {
    return {
      type: UPDATE_SUBTASK_SUCCESS
    };
  }

export function updateSubTaskError(error) {
  return {
    type: UPDATE_SUBTASK_ERROR,
    error
  };
}

  
  export function updateSubTaskPending() {
    return {
      type: UPDATE_SUBTASK_PENDING
    };
  }

  export function deleteSubTaskSuccess() {
    return {
      type: DELETE_SUBTASK_SUCCESS,
      
    };
  }
  export function deleteSubTaskError(error) {
    return {
      type: DELETE_SUBTASK_ERROR,
      error
    };
  }
  export function deleteSubTaskPending() {
    return {
      type: DELETE_SUBTASK_PENDING,
    };
  }