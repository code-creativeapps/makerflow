export const ACTIVATE_TASK = 'ACTIVATE_TASK';
export const DEACTIVATE_TASK = 'DEACTIVATE_TASK';
export const MOVE_TASK = 'MOVE_TASK';


// Implement drag and drop logic

function fromMilestonesToDays() {
  // Get source/destination data
  // dispatch DROP_FROM_MILESTONES_TO_TASK 
  // set new state in reducer with immutability helper
}


export function setCounter(counter) {
    return {
      type: MOVE_TASK,
      counter: counter
    };
  }
  
  export function increment() {
    return {
      type: ACTIVATE_TASK
    };
  }
  
  export function decrement() {
    return {
      type: DEACTIVATE_TASK
    };
  }
  
  export function incrementIfOdd() {
    return (dispatch, getState) => {
      const { counter } = getState();
  
      if (counter % 2 === 0) {
        return;
      }
  
      dispatch(increment());
    };
  }
  
  export function incrementAsync(delay = 1000) {
    return dispatch => {
      console.log('incrementAsync')
      setTimeout(() => {
        dispatch(increment());
      }, delay);
    };
  }