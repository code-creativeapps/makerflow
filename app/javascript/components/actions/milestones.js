// Milestones
export const ADD_MILESTONE_PENDING = 'ADD_MILESTONE_PENDING';
export const ADD_MILESTONE_SUCCESS = 'ADD_MILESTONE_SUCCESS';
export const ADD_MILESTONE_ERROR = 'ADD_MILESTONE_ERROR';

export const DELETE_MILESTONE_PENDING = 'DELETE_MILESTONE_PENDING';
export const DELETE_MILESTONE_SUCCESS = 'DELETE_MILESTONE_SUCCESS';
export const DELETE_MILESTONE_ERROR = 'DELETE_MILESTONE_ERROR';

export const UPDATE_MILESTONE_PENDING = 'UPDATE_MILESTONE_PENDING';
export const UPDATE_MILESTONE_SUCCESS = 'UPDATE_MILESTONE_SUCCESS';
export const UPDATE_MILESTONE_ERROR = 'UPDATE_MILESTONE_ERROR';

export function addMilestoneSuccess() {
    return {
      type: ADD_MILESTONE_SUCCESS
    };
  }
  export function addMilestoneError() {
    return {
      type: ADD_MILESTONE_ERROR
    };
  }
  export function addMilestonePending() {
    return {
      type: ADD_MILESTONE_PENDING
    };
  }

export function updateMilestoneSuccess() {
    return {
      type: UPDATE_MILESTONE_SUCCESS
    };
  }
  export function updateMilestoneError() {
    return {
      type: UPDATE_MILESTONE_ERROR
    };
  }
  export function updateMilestonePending() {
    return {
      type: UPDATE_MILESTONE_PENDING
    };
  }

  export function deleteMilestoneSuccess() {
    return {
      type: DELETE_MILESTONE_SUCCESS,
      
    };
  }
  export function deleteMilestoneError() {
    return {
      type: DELETE_MILESTONE_ERROR,
      
    };
  }
  export function deleteMilestonePending() {
    return {
      type: DELETE_MILESTONE_PENDING,
    };
  }