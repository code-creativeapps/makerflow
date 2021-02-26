import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'

const Planning = ({planning}) => {

    const [dates, setDates] = useState([])
    const [layout, setLayout] = useState('column')

    const getDatesBetweenDates = (startDate, endDate) => {
        let dates = []
        //to avoid modifying the original date
        const theDate = new Date(startDate)
        while (theDate <= endDate) {
          dates = [...dates, new Date(theDate)]
          theDate.setDate(theDate.getDate() + 1)
        }
        dates = [...dates, endDate]
        return dates
      }
    
    useEffect(() => {
        // const dates = getDatesBetweenDates(moment(), moment().add(7, 'days')) <-- Start today, Ends in 7 days
        const dates = getDatesBetweenDates(moment().startOf('week'), moment().endOf('week')) // <-- Start of the week, end of the week
        setDates(dates)
    }, [])

    const renderTasks = (date) => {
        const dayFound = planning.find((day => day.date == moment(date).format('L')))
        
        if (dayFound) {
            const tasks = dayFound.tasks?.map((task, i) => <Task key={task.id} task={task} index={i}/>)
            return tasks
        } else {
            return []
        }
    }
    return (
        <>
        {/* Planning */}
            <div className="w-full px-4 py-2 overflow-y-scroll border border-gray-300">
                <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">Planning
                    <div class="flex">
                        <div onClick={() => setLayout('column')} class="bg-gray-600 py-2 px-3 text-sm border-r-2 border-gray-200 rounded-l flex items-center">
                            <svg class="w-4 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg> 
                        </div>
                        <div onClick={() => setLayout('row')} class="bg-gray-600 py-2 px-3 text-sm rounded-r flex items-center">
                            <svg class="w-4 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </div>
                    </div>
                </h2>
                {/* Days */}
                <div className={
                    layout == 'row' 
                    ? `space-y-4`
                    : `flex px-4 pb-8 items-start overflow-x-scroll min-h-full`
                }>
                    { dates.slice(0, 7).map((date, i) => (
                        <Droppable key={i + 4} droppableId={moment(date).format('L')}>
                            {(provided) => (
                                <div key={i} className={
                                    layout == 'row' 
                                    ? `space-y-2`
                                    : `flex flex-col `
                                }>
                                    <h3 className={`flex text-lg font-medium text-gray-700 ${layout == 'column' ? 'flex-col text-left': 'items-center'}`}>{moment(date).format('dddd')} <span className={`${layout == 'row' ? 'ml-2' : 'mb-3'} text-sm font-normal`}>{moment(date).format('LL')}</span></h3>
                                    <div {...provided.droppableProps} innerRef={provided.innerRef} ref={provided.innerRef} className={
                                        layout == 'row' 
                                        ? `grid grid-cols-4 gap-2 p-5 bg-white rounded shadow`
                                        : `bg-white flex-no-shrink w-64 mr-3 min-h-screen rounded p-3 shadow`
                                    }>
                                        { renderTasks(date) }
                                        {/* <div className="p-2 my-2 text-sm font-semibold text-white bg-pink-400 rounded shadow-sm">Write UX/UI Brief</div>
                                        <div className="p-2 my-2 text-sm font-semibold text-white bg-purple-400 rounded shadow-sm">Write UX/UI Brief</div>
                                        <div className="p-2 my-2 text-sm font-semibold text-white bg-green-400 rounded shadow-sm">Write UX/UI Brief</div>
                                        <div className="flex justify-between p-2 my-2 text-sm font-semibold text-white bg-pink-600 rounded shadow-sm">Write UX/UI Brief
                                            <div className="flex">
                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>        
                                            </div>
                                        </div> */}
                                        { provided.placeholder }
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </div>
        </> 
    )
}

export default Planning