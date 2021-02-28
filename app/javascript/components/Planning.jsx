import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import ScrollContainer from 'react-indiana-drag-scroll'

const Planning = ({ planning, isDragging }) => {

    const [dates, setDates] = useState([])
    const [layout, setLayout] = useState('column')
    const [weekDirection, changeWeekView] = useState('')
    const [weekCount, setWeekCount] = useState(0)

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
    
    useEffect(() => {
        if (weekDirection == 'forward') {
            setWeekCount(weekCount => weekCount + 1)
        } else if (weekDirection == 'backward') {
            setWeekCount(weekCount => weekCount - 1)
        }
    }, [weekDirection])

    useEffect(() => {
        if (weekDirection == 'forward') {
            const dates = getDatesBetweenDates(moment().add(weekCount, 'weeks').startOf('week'), moment().add(weekCount, 'weeks').endOf('week'))
            setDates(dates)
        } else if (weekDirection == 'backward') {
            const dates = getDatesBetweenDates(moment().subtract(Math.abs(weekCount), 'weeks').startOf('week'), moment().subtract(Math.abs(weekCount), 'weeks').subtract(weekCount, 'weeks').endOf('week'))
            setDates(dates)
        }
        changeWeekView('')
    }, [weekCount])
    
    const renderTasks = (date) => {
        const dayFound = planning.find((day => day.date == moment(date).format('L')))
        
        if (dayFound) {
            return dayFound.tasks.length > 0 ? dayFound.tasks?.map((task, i) => <Task key={task.id} task={task} index={i}/>) : <p className="text-sm text-gray-300 cursor-default">Drop some tasks here...</p>
        } else {
            return <p className="text-sm text-gray-300 cursor-default">Drop some tasks here...</p>
        }
    }
    return (
        <>
        {/* Planning */}
        
            <div className="relative w-full px-4 py-2 overflow-y-scroll border border-gray-300">
                <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">
                <div class="flex">
                        <div onClick={() => setLayout('column')} class={`${layout == 'column' ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'} py-2 px-3 text-sm rounded-l flex items-center cursor-pointer`}>
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </div>
                        <div onClick={() => setLayout('row')} class={`${layout == 'row' ? 'bg-gray-600 text-white' : 'bg-white text-gray-600'} py-2 px-3 text-sm border-gray-200 rounded-r flex items-center cursor-pointer`}>
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg> 
                        </div>
                    </div>
                    Planning

                    <div class="flex">
                        <div onClick={() => changeWeekView('backward')} class={`hover:bg-gray-600 hover:text-white bg-white text-gray-600 py-2 px-3 text-sm rounded-l flex items-center cursor-pointer`}>
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <div onClick={() => changeWeekView('forward')} class={`hover:bg-gray-600 hover:text-white bg-white text-gray-600 py-2 px-3 text-sm border-gray-200 rounded-r flex items-center cursor-pointer`}>
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </h2>
                {/* Days */}
                <ScrollContainer hideScrollbars={false} className={
                    layout == 'row' 
                    ? `space-y-4`
                    : `flex px-0 pb-8 items-start overflow-x-scroll min-h-full overscroll-contain`
                }>
                    { dates.slice(0, 7).map((date, i) => (
                        <Droppable key={i + 4} droppableId={moment(date).format('L')}>
                            {(provided, snapshot) => {
                                return (
                                <div key={i} className={
                                    layout == 'row' 
                                    ? `space-y-2`
                                    : `flex flex-col`
                                }>
                                    <h3 className={`flex text-lg font-medium text-gray-700 ${layout == 'column' ? 'flex-col text-left': 'items-center'}`}>{moment(date).format('dddd')} <span className={`${layout == 'row' ? 'ml-2' : 'mb-3'} text-sm font-normal`}>{moment(date).format('LL')}</span></h3>
                                    <div {...provided.droppableProps} innerRef={provided.innerRef} ref={provided.innerRef} className={
                                        layout == 'row' 
                                        ? `grid grid-cols-4 gap-2 p-5 bg-white rounded shadow`
                                        : `bg-white flex-no-shrink w-64 mr-3 min-h-full rounded p-3 shadow`
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
                            )}}
                        </Droppable>
                    ))}
                </ScrollContainer>
            </div>
            
        </> 
    )
}

export default Planning