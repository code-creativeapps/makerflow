import React from "react"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-2 bg-white border border-gray-300">
            <h3 className="mb-8 text-2xl font-medium text-gray-600">Projects</h3>
            {/* Plus button */}
            {/* Projects */}
            <div>
              {/* Makerflow */}
              <div>
                {/* Color select + Name + Update icon */}
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center text-lg font-normal text-gray-400"><div className="w-4 h-4 mr-4 bg-yellow-600 rounded-full"></div>Makerflow</h3>
                  <svg className="w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                
              </div>
            </div>
        </div>
        {/* Planning */}
        <div className="w-full p-2 border border-gray-300">
            <h5>Planning</h5>
        </div>
    </div>
  )
}

export default Dashboard