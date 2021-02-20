import React from "react"

const Dashboard = () => {
  return (
    <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-2 overflow-y-scroll bg-white border border-gray-300">
            <h2 className="flex items-center justify-between mb-8 text-2xl font-semibold text-gray-600">Projects<button className="focus:outline-none flex text-base items-center justify-center w-4 h-4 bg-gray-600 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button></h2>
            {/* Plus button */}
            {/* Projects */}
            <div>
              {/* Makerflow */}
              <div>
                {/* Color select + Name + Update icon */}
                <div className="flex items-center justify-between mb-4 group">
                  <h3 className="flex items-center text-lg font-medium text-gray-700"><div className="w-4 h-4 mr-4 bg-yellow-600 rounded-full"></div>Makerflow</h3>
                  <svg className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                {/* Milestones */}
                <div>
                  {/* Milestone #1 */}
                  <div className="flex items-center justify-between mb-2 space-x-2 opacity-100 group group-focus:opacity-0">
                    <h4 className="flex items-center text-base font-normal text-gray-400">
                      <button className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full focus:outline-none group">
                        <div style={{borderTop: "5px solid white"}} className="w-0 h-0 border-t border-b-0 border-transparent border-solid border-5"></div>
                      </button>
                      UX/UI
                    </h4>
                     {/* Progress Bar */}
                    {/* <div className="w-full bg-gray-500"><div className="w-3/4 p-1 text-xs font-semibold text-center bg-yellow-400"><p className="text-white">72%</p></div></div> */}
                    <button className="focus:outline-none opacity-0 group-hover:opacity-100 flex items-center justify-center w-4 h-4 bg-yellow-600 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
                  </div>
                  {/* Progress Bar */}
                  {/* <div className="w-full bg-gray-500 "><div className="w-3/4 p-1 text-xs font-semibold text-center bg-yellow-400"><p className="text-white">72%</p></div></div> */}
                  {/* Tasks */}
                  {/* Task #1 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-yellow-500 rounded shadow-sm">Write UX/UI Brief</div>
                  {/* Task #2 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-yellow-500 rounded shadow-sm">Create Job Offer</div>
                  {/* Task #3 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-yellow-500 rounded shadow-sm">Choose a designer</div>
                  <input placeholder="Add a new task in UX/UI..." className="w-full p-2 my-2 text-sm font-semibold text-yellow-600 placeholder-yellow-600 bg-white border-2 border-yellow-500 rounded shadow-sm outline-none focus:bg-yellow-600 focus:text-white focus:placeholder-white"/>
                </div>
                {/* Add Milestone */}
                <h4 className="flex items-center mt-2 text-base font-normal text-gray-400">
                  <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                    <button className="focus:outline-none flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
                  </div>
                  <input class="outline-none placeholder-gray-400 placeholder:font-normal" placeholder="Add a Milestone"/>
                </h4>
              </div>
              {/* Mindset Mobile App */}
              <div className="mt-10">
                {/* Color select + Name + Update icon */}
                <div className="flex items-center justify-between mb-4 group">
                  <h3 className="flex items-center text-lg font-medium text-gray-700"><div className="w-4 h-4 mr-4 bg-green-300 rounded-full"></div>Mindset Mobile App</h3>
                  <svg className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                {/* Milestones */}
                <div className="group">
                  {/* Milestone #1 */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="flex items-center text-base font-normal text-gray-400">
                      <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                        <div style={{borderTop: "5px solid white"}} className="w-0 h-0 border-t border-b-0 border-transparent border-solid border-5"></div>
                      </div>
                      UX/UI
                    </h4>
                    <button className="focus:outline-none opacity-0 group-hover:opacity-100 flex items-center justify-center w-4 h-4 bg-green-400 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
                  </div>
                  {/* Tasks */}
                  {/* Task #1 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-green-400 rounded shadow-sm">Write UX/UI Brief</div>
                  {/* Task #2 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-green-400 rounded shadow-sm">Create Job Offer</div>
                  {/* Task #3 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-green-400 rounded shadow-sm">Choose a designer</div>
                  <input placeholder="Add a new task in UX/UI..." className="w-full p-2 my-2 text-sm font-semibold text-green-400 placeholder-green-400 bg-white border-2 border-green-500 rounded shadow-sm outline-none focus:bg-green-600 focus:text-white focus:placeholder-white"/>
                </div>
                {/* Add Milestone */}
                <h4 className="flex items-center mt-2 text-base font-normal text-gray-400">
                  <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                    <button className="focus:outline-none flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
                  </div>
                  <input class="outline-none placeholder-gray-400 placeholder:font-normal" placeholder="Add a Milestone"/>
                </h4>
              </div>
              {/* SlackNewsletter */}
              <div className="mt-10">
                {/* Color select + Name + Update icon */}
                <div className="flex items-center justify-between mb-4 group">
                  <h3 className="flex items-center text-lg font-medium text-gray-700"><div className="w-4 h-4 mr-4 bg-pink-600 rounded-full"></div>SlackNewsletter</h3>
                  <svg className="w-5 text-gray-600 opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                {/* Milestones */}
                <div className="group">
                  {/* Milestone #1 */}
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="flex items-center text-base font-normal text-gray-400">
                      <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                        <div style={{borderTop: "5px solid white"}} className="w-0 h-0 border-t border-b-0 border-transparent border-solid border-5"></div>
                      </div>
                      UX/UI
                    </h4>
                    <button className="focus:outline-none opacity-0 group-hover:opacity-100 flex items-center justify-center w-4 h-4 bg-pink-600 rounded-full pb-0.5 text-white font-semibold"><p>+</p></button>
                  </div>
                  {/* Tasks */}
                  {/* Task #1 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-pink-600 rounded shadow-sm">Write UX/UI Brief</div>
                  {/* Task #2 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-pink-600 rounded shadow-sm">Create Job Offer</div>
                  {/* Task #3 */}
                  <div className="p-2 my-2 text-sm font-semibold text-white bg-pink-600 rounded shadow-sm">Choose a designer</div>
                  <input placeholder="Add a new task in UX/UI..." className="w-full p-2 my-2 text-sm font-semibold text-pink-400 placeholder-pink-400 bg-white border-2 border-pink-500 rounded shadow-sm outline-none focus:bg-pink-700 focus:text-white focus:placeholder-white"/>
                </div>
                {/* Add Milestone */}
                <h4 className="flex items-center mt-2 text-base font-normal text-gray-400">
                  <div className="flex items-center justify-center w-4 h-4 mr-4 bg-gray-400 rounded-full">
                    <div className="flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full pb-0.5 text-white font-semibold"><p>+</p></div>
                  </div>
                  <input class="outline-none placeholder-gray-400 placeholder:font-normal" placeholder="Add a Milestone"/>
                </h4>
              </div>
              {/* End Projects List */}
            </div>
            {/* End SideBar content (H2 + New Project + Project list) */}
        </div>
        {/* Planning */}
        <div className="w-full p-2 border border-gray-300">
            <h5>Planning</h5>
        </div>
    </div>
  )
}

export default Dashboard