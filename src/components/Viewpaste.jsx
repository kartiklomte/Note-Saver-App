import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ViewPaste = () => {

  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste);

  return (
    <div className='flex flex-col'>


      <div className="flex flex-row gap-7 place-content-between mt-2">
      
      <input 
        className='p-2 bg-black rounded-2xl w-[64%] pl-4'
        type="text" 
        placeholder='enter text here' 
        value={paste.title} 
        disabled
        onChange={(e)=>setTitle(e.target.value)}
      />

      </div>


      <div className='mt-8'>
        <textarea
          className='bg-black rounded-2xl mt-4 min-w-[500px] p-4'
          value={paste.content}
          placeholder='enter content here'
          disabled
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
        />
      </div>


    </div>
  )
}

export default ViewPaste