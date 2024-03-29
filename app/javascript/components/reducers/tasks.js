import { 
    UPDATE_STATE,
    ADD_TASK,
    ADD_MILESTONE,
    DELETE_MILESTONE,
    FROM_MILESTONES_TO_DAYS,
    FROM_DAYS_TO_MILESTONES,
    FROM_DAYS_TO_DAYS,
    FROM_MILESTONES_TO_MILESTONES,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_PENDING,
    FETCH_DATA_ERROR,
    OPEN_TASK,
    CLOSE_TASK,
} from '../actions';

import update from 'immutability-helper';

const demoState = {
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
    ],
    openedTask: null
}

const initialState = {
  projects: [],
  planning: [],
  openedTask: null,
  showPanel: false
}

// Implement Immutability helpers
export default function tasks(state = initialState, action) {
    const {
        projects,
        planning,
        task,
        type,
        projectIndex,
        milestoneIndex, 
        newTasksIds,
        newDay,
        dayIndex, 
        sourceDayIndex,
        destinationDayIndex,
        draggedTaskIndex,
        draggedTask,
        newTask,
        openedTask,
        showPanel,
        newMilestone,
        newProject,
        color,
        colorBase,
        colorShade,
    } = action
    switch (type) {
      case UPDATE_STATE:
          return update(state, { 
            projects: { $set: projects }, 
            planning: { $set: planning },
            openedTask: { $set: task }
          })
      case FETCH_DATA_SUCCESS:
          return update(state, { 
            projects: { $set: projects }, 
            planning: { $set: planning }
          })
        // case SET_PROJECT_COLOR: 
        //   return update(state, {
        //     projects: {
        //         [projectIndex]: {
        //           color: { $set: color },
        //           colorBase: { $set: colorBase },
        //           colorShade: { $set: colorShade },
        //         }
        //       }
        //     })
        // case ADD_PROJECT: 
        //   return update(state, { projects: { $unshift: [newProject] } })
        // case DELETE_PROJECT: 
        //   return update(state, { projects: { $splice: [[projectIndex, 1]] }})
        case ADD_MILESTONE: 
          return update(state, {
            projects: {
                [projectIndex]: {
                  milestones: { $push: [newMilestone] }
                }
              }
            })
        case DELETE_MILESTONE: 
          return update(state, {
              projects: {
                  [projectIndex]: {
                    milestones: { $splice: [[milestoneIndex, 1]] }
                  }
                }
              })
        case OPEN_TASK: 
            return update(state, {
                openedTask: { $set: openedTask },
                showPanel: { $set: showPanel },
            }) 
        case CLOSE_TASK: 
            return update(state, {
                openedTask: { $set: null }
            }) 
        case ADD_TASK: 
            return update(state, {
                projects: {
                    [projectIndex]: {
                        milestones: {
                            [milestoneIndex]: {
                                tasks: { $push: [newTask] },
                                tasksIds: { $push: [newTask.id]}
                            }
                        }
                    }
                }
            }) 
        case FROM_DAYS_TO_MILESTONES:
            console.log('hey 2', draggedTask, draggedTaskIndex)
            return update(state, {
                  planning: {
                    [sourceDayIndex]: { 
                        tasks: {$splice: [[draggedTaskIndex, 1]]}
                    }
                  },
                  projects: {
                    [projectIndex]: {
                        milestones: {
                            [milestoneIndex]: {
                                tasks: { $push: [draggedTask]},
                                // tasksIds: { $push: [draggedTask.id]}
                            }
                        }
                    }
                }
              })
        case FROM_DAYS_TO_DAYS:
            if (destinationDayIndex >= 0) {
                const newState = update(state, {
                  planning: {
                    [destinationDayIndex]: {
                        tasks: { $push: newDay.tasks}
                    },
                    [sourceDayIndex]: { 
                        tasks: {$splice: [[draggedTaskIndex, 1]]}
                    }
                  }
              })
                return newState
              } else {
                const newState = update(state, {
                      planning: {
                        [sourceDayIndex]: { 
                            tasks: {$splice: [[draggedTaskIndex, 1]]}
                        },
                        $push: [newDay]
                    }
                  })
                return newState
              }
        case FROM_MILESTONES_TO_MILESTONES:
            return update(state, {
                projects: {
                    [projectIndex]: {
                        milestones: {
                            [milestoneIndex]: { $set: {
                                // tasksIds: [newTasksIds]
                                tasks: {$push: [draggedTask]}
                            }}
                        }
                    }
                }        
            })
        case FROM_MILESTONES_TO_DAYS:
            if (dayIndex >= 0) {
              const newState = update(state, {
                projects: {
                    [projectIndex]: {
                        milestones: {
                            [milestoneIndex]: {
                              tasksIds: { $set: [newTasksIds] }, 
                              tasks: { $splice: [[draggedTaskIndex, 1]] }
                            }
                        }
                    }
                },
                planning: {
                    [dayIndex]: { $merge: {
                        tasks: newDay.tasks
                    }}
                }     
                
            })
            return newState
            } else {
                const newState = update(state, {
                    projects: {
                        [projectIndex]: {
                            milestones: {
                              [milestoneIndex]: {
                                tasksIds: { $set: [newTasksIds] }, 
                                tasks: { $splice: [[draggedTaskIndex, 1]] }
                              }
                            }
                        }
                    },
                    planning: { $push: [newDay] }
                })
                return newState
            }
        default:
            return state;
        }
}