import React from 'react'
import { Dumbbell, Edit3Icon, FileText, Pill, QrCode,  Send,  Share2Icon, Users } from 'lucide-react';
import { ArrowRight, HeartPlus, NotepadText, Video } from "lucide-react";


function Dashboard() {
  return (
    <div className="relative  flex gap-4 items-start justify-around w-full mt-1 p-4">
      {/* Left Section  */}
      <div className='flex-1 min-h-full w-[30vw] bg-gray-200 rounded-xl  p-4'>
        <div className='m-4 p-2 text-left flex flex-col items-start justify-center w-full'>
          <h1 className='text-5xl font-medium font-sans '>Plus Card</h1>
          {/* Pulse Card  */}
          <div className='mx-auto w-[90%] h-max rounded-md p-2 mt-4'>
            <div className="outer border-4 border-blue-700 rounded-t-2xl h-12">
            </div>
            <div className="outer border-4 border-blue-700 rounded-b-2xl h-64 p-2">
              <div className="min-h-full w-full flex justify-around items-start p-2">
                <div className='w-[20%]'>
                  <div className='aspect-square h-28 bg-blue-400 rounded-full'></div>
                </div>
                <div className='w-[70%] flex flex-col items-start justify-start'>
                  <div>
                    <h2 className='text-2xl font-semibold my-2'>John Doe</h2>
                    <h2 className='text-2xl font-semibold my-2'>ID:
                      <span className='text-blue-700 m-2'>JEKvkajb78w92r</span>
                      </h2>
                  </div>
                  <div className='flex items-start justify-between w-full mt-2'>
                    <div className='flex flex-col items-start justify-start gap-2'>
                      <h2 className='text-xl font-medium text-gray-600'>DOB:</h2>
                      <h2 className='text-xl font-medium text-gray-600'>Gender:</h2>
                      <h2 className='text-xl font-medium text-gray-600'>Address:</h2>
                    </div>
                    {/* // QR code */}
                    <div>
                        <div className=' '>
                          <QrCode size={80} color="black" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Share Btns  */}
            <div className='flex items-center justify-end mt-4 gap-4'>
              <Edit3Icon size={30} color="black" />
              <Send size={30} color="black" />
              <Share2Icon size={30} color="black" className='mx-2' />
            </div>

            {/* Add Main Options  */}
              <div className="flex items-center justify-around mt-4 gap-4">
                <div className="flex flex-col items-center cursor-pointer">
                  <FileText size={50} className="" />
                  <span className="text-xl font-semibold mt-2">Records</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                  <Users size={50} className="" />
                  <span className="text-xl font-semibold mt-2">Family</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                  <Dumbbell size={50} className="" />
                  <span className="text-xl font-semibold mt-2">Fitness</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                  <Pill size={50} className="" />
                  <span className="text-xl font-semibold mt-2">Prescriptions</span>
                </div>
              </div>
          </div>
          {/* Appointments section*/}
          <section className='mt-4 p-8 w-full m-2'>
          <h1 className='text-5xl font-medium font-sans '>Appointments</h1>
          <div className='w-full h-[20rem] bg-stone-500 border-2 border-black mt-4 rounded-md p-4'>

          </div>
          </section>
        </div>
      </div>
      {/* Right Section */}
      <div className='flex-1 min-h-full flex items-center justify-center  w-[30vw] bg-gray-200 rounded-md'>
        hello
      </div>
      {/* Profile Section */}
      {/* <div className=' flex items-center min-h-full justify-center w-[20vw] bg-gray-200 rounded-md'>
        <div className=" flex justify-center items-center w-[90%] h-[90%]">
          <div className=" h-[90%] rounded-lg shadow-lg border-[#8D3E5F] border bg-white p-4">
            <div
              className=" flex flex-col justify-center items-center"
              id="profileDiv"
            >
              
              <img
                src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
                className="h-40 w-40 rounded-full object-cover object-top shadow-md"
              />
              <h1 className="text-3xl font-semibold mt-4">Jonathan Brooks</h1>
              <h2 className="text-xl  mt-2">30 Years</h2>
              <div className="flex  justify-center items-center mt-4 border-b border-slate-300 pb-5 w-[90%] ">
                <div className="flex flex-col h-full px-4 " id="bloodGroup">
                  <p className="text-xl">Blood</p>
                  <p className="text-lg text-[#8D3E5F] text-center">AB+</p>
                </div>
                <div
                  className="flex flex-col px-4 h-full border-x-2 border-slate-300"
                  id="height"
                >
                  <p className="text-xl">Height</p>
                  <p className="text-lg text-[#8D3E5F] text-center">180cm</p>
                </div>
                <div className="flex flex-col h-full px-4" id="weight">
                  <p className="text-xl">Weight</p>
                  <p className="text-lg text-[#8D3E5F] text-center">70Kg</p>
                </div>
              </div>
              <div
                className=" w-full mt-3 h-60 p-2 overflow-hidden"
                id="healthPlans"
              >
                <div className=" flex justify-between">
                  <p className="flex w-full gap-x-3">
                    <HeartPlus size={40} color="#8D3E5F" /> <span className='text-xl font-semibold'>Health Plans</span>
                  </p>
                  <ArrowRight size={40} />
                </div>
                <div className=" h-44 w-full overflow-y-scroll my-2 text-base text-slate-600">
                  <ul className="list-disc pl-5">
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam numquam labore corrupti
                    </li>
                    <li>
                      Reprehenderit vel nam quidem incidunt perspiciatis?
                      Reprehenderit, voluptatum et? Reprehenderit, voluptatum et?
                    </li>
                    <li>
                      Reprehenderit vel nam quidem incidunt perspiciatis?
                      Reprehenderit, voluptatum et?
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className=" w-full p-2 border-y border-slate-300 "
                id="healthRecords"
              >
                <div className=" flex justify-between ">
                  <p className="flex w-full gap-x-3">
                    <NotepadText color="#8D3E5F" size={38} />
                    <span className='text-lg font-semibold'>My Health Records</span>
                  </p>
                  <ArrowRight />
                </div>
              </div>
              <div
                className=" w-full p-2 border-b border-slate-300"
                id="Appointments"
              >
                <div className=" flex justify-between">
                  <p className="flex w-full gap-x-3">
                    <Video color="#8D3E5F" size={38}  /> <span className='text-lg font-semibold'>Appointments</span>
                  </p>
                  <ArrowRight />
                </div>
              </div>
              <div className="w-full h-40 bg-slate-300 rounded-2xl my-3"></div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard

