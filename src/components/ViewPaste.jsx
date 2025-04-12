import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import copy from '../assets/copy.png'

const ViewPaste = () => {

  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste);

  return (
    <div className='relative mr-auto ml-auto mt-12 flex flex-col bg-white p-4 w-[1100px] justify-center'>


      <div className="relative mr-auto ml-auto mt-12 flex flex-col bg-white p-4 w-[1100px] justify-center">
      
      <input 
        className='p-2 rounded-md h-[40px] w-[80%] pl-4 text-red-600 border-1 border-black shadow-2xl'
        type="text" 
        placeholder='enter title here' 
        value={paste.title} 
        disabled
        onChange={(e)=>setTitle(e.target.value)}
      />

      </div>


      <div className='mt-8 border border-black bg-gray-300 p-1 rounded-xl shadow-2xl'>
        
        <div className='flex flex-row mt-2 place-content-between pr-5 align-middle'>
          <div className='flex flex-row mt-1'>
            <div className='bg-orange-400 h-4 w-4 rounded-full ml-2'></div>
            <div className='bg-yellow-400 h-4 w-4 rounded-full ml-2'></div>
            <div className='bg-green-400 h-4 w-4 rounded-full ml-2'></div>
          </div>
          <button className=' align-middle -mt-2' onClick={() => { navigator.clipboard.writeText(value); toast.success("content copied");}}>
            <img src={copy} alt="copy logo" className=' justify-between align-middle h-7'/>
          </button>
        </div>


        <textarea
          className='bg-gray-200 rounded-2xl min-w-[500px] p-4 mt-3 border border-black w-full text-black'
          placeholder='enter content here'
          value={paste.content}
          disabled
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
        />
      </div>


    </div>
  )
}

export default ViewPaste
