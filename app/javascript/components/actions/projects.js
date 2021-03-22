// Projects
export const ADD_PROJECT_PENDING = 'ADD_PROJECT_PENDING';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';

export const DELETE_PROJECT_PENDING = 'DELETE_PROJECT_PENDING';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';

export const UPDATE_PROJECT_PENDING = 'UPDATE_PROJECT_PENDING';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';

export function addProjectSuccess() {
    return {
      type: ADD_PROJECT_SUCCESS
    };
  }
  export function addProjectError() {
    return {
      type: ADD_PROJECT_ERROR
    };
  }
  export function addProjectPending() {
    return {
      type: ADD_PROJECT_PENDING
    };
  }

export function updateProjectSuccess() {
    return {
      type: UPDATE_PROJECT_SUCCESS
    };
  }
  export function updateProjectError() {
    return {
      type: UPDATE_PROJECT_ERROR
    };
  }
  export function updateProjectPending() {
    return {
      type: UPDATE_PROJECT_PENDING
    };
  }

  export function deleteProjectSuccess() {
    return {
      type: DELETE_PROJECT_SUCCESS,
      
    };
  }
  export function deleteProjectError() {
    return {
      type: DELETE_PROJECT_ERROR,
      
    };
  }
  export function deleteProjectPending() {
    return {
      type: DELETE_PROJECT_PENDING,
    };
  }