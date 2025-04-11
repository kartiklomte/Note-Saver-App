import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import taste, { toast } from 'react-hot-toast'
import { NavLink } from 'react-router-dom';
import copy from '../assets/copy.png' ;
import deletelogo from '../assets/deletelogo.png';
import edit from '../assets/edit.png';
import calendar from '../assets/calendar.png';
import show from '../assets/show.png';
import back from '../assets/back.png';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm,setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    const shareableLink = `${window.location.origin}/paste/${paste._id}`; // Update path if needed
  
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Share link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  }

  return (
    <div className=' mr-auto ml-auto flex flex-col bg-white p-4 w-[1100px] justify-center mt-20 border-2 border-black rounded-2xl'>

      <input 
        className='p-2 rounded-t-md h-[40px] w-[100%] pl-4 text-red-600 border-1 border-black shadow-2xl'
        type="search"
        placeholder='search here'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <h1 className='mt-5 border border-black text-black font-semibold p-5 text-left'>All Pastes</h1>

      <div className='flex flex-col gap-5 border border-black p-2 rounded-b-md'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div key={paste._id} className='rounded-md flex-wrap w-[100%] text-black border-1 border-black shadow-md grid h-30 grid-cols-2 place-content-around '>
                  <h2 className=' text-black font-bold pt-2 pl-5 text-left'>
                    {paste.title}
                  </h2>

                  <div className='flex flex-row gap-4 mt-2 justify-end mr-5'>
                    <button className='border border-black p-2 rounded-md h-9'>
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        <img src={edit} alt="edit logo" className=' justify-between align-middle h-5 w-5'/>
                      </NavLink>
                    </button>

                    <button className='border border-black p-2 rounded-md h-9'>
                      <NavLink to={`/pastes/${paste?._id}`}>
                        <img src={show} alt="copy logo" className=' justify-between align-middle h-5 w-5'/>
                      </NavLink>
                    </button>

                    <button onClick={()=>handleDelete(paste?._id)} className='border border-black p-2 rounded-md h-9'>
                      <img src={deletelogo} alt="copy logo" className=' justify-between align-middle h-5 w-5'/>
                    </button>

                    <button onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("content copied");}} className='border border-black p-2 rounded-md h-9'>
                      <img src={copy} alt="copy logo" className=' justify-between align-middle h-5 w-5'/>
                    </button>

                    <button onClick={() => handleShare(paste)} className='border border-black p-2 rounded-md h-9'>
                      <img src={back} alt="copy logo" className=' justify-between align-middle h-5 w-5'/>
                    </button>
                  </div>

                  <h3 className=' text-black pb-4 pl-5 text-left'>
                    {paste.content}
                  </h3>

                  <div className='flex flex-row gap-1 mb-2 justify-end pr-35'>
                    <img src={calendar} alt="copy logo" className=' justify-between align-middle h-7'/>
                    <h3 className=''>{new Date(paste.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',})}
                    </h3>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste