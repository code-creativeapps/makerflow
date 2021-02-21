import React from "react"
import Sidebar from './Sidebar'
import Planning from './Planning'

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
          name: 'UX/UI',
          expanded: true,
          tasks: [
            {
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
          name: 'Dev',
          expanded: true,
          tasks: [
            {
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
          name: 'UX/UI',
          expanded: true,
          tasks: [
            {
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
      date: "24/02/2021",
      tasks: [
        {
          name: 'Choose a designer',
          date: null,
          completed: false,
          recurring: false,
          total_minutes: 99,
          project_id: 1,
          notes: "Look for a designer on Upwork",
        }
      ]
    }
  ]
}

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar projects={DATA.projects}/>
        {/* Planning */}
        <Planning/>
    </div>
  )
}

export default Dashboard