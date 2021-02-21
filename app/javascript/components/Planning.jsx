import React, { useEffect, useState } from 'react'
import moment from 'moment'

const Planning = () => {

    const [dates, setDates] = useState([])

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
        console.log(moment().endOf('week'))
        // const dates = getDatesBetweenDates(moment(), moment().add(7, 'days')) <-- Start today, Ends in 7 days
        const dates = getDatesBetweenDates(moment().startOf('week'), moment().endOf('week')) // <-- Start of the week, end of the week
        setDates(dates)
        console.log(dates)
    }, [])

    return (
        <>
        {/* Planning */}
            <div className="w-full px-4 py-2 overflow-y-scroll border border-gray-300">
                <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">Planning</h2>
                {/* Days */}
                <div className="space-y-4">
                    { dates.slice(0, 7).map((date) => (
                        <div className="space-y-2">
                            <h3 className="flex items-center text-lg font-medium text-gray-700">{moment(date).format('dddd')} <span class="font-normal text-sm ml-2">{moment(date).format('LL')}</span></h3>
                            <div className="grid grid-cols-4 gap-2 p-5 bg-white rounded">
                            <div className="p-2 my-2 text-sm font-semibold text-white bg-pink-400 rounded shadow-sm">Write UX/UI Brief</div>
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
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </> 
    )
}

export default Planning