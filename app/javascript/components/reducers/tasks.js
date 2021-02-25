import { ACTIVATE_TASK, DEACTIVATE_TASK, MOVE_TASK } from '../actions/tasks';

// Implement Immutability helpers
export default function tasks(state = 0, action) {
  switch (action.type) {
  case ACTIVATE_TASK:
    return state + 1;
  case DEACTIVATE_TASK:
    return state - 1;
  case MOVE_TASK:
    return action.counter;
  default:
    return state;
  }
}