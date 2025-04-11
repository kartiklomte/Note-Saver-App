import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import  copy  from '../assets/copy.png'
import taste, { toast } from 'react-hot-toast'

const Home = () => {
  const [title,setTitle] = useState('');
  const[value,setValue] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=> state.paste.pastes);

  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=> p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste(){
    const paste = {
      title : title,
      content : value,
      _id : pasteId || Date.now().toString(36),
      createdAt : new Date().toISOString(),
    }

    if(pasteId){
      //pasteId is available that means we need to edit the paste
      dispatch(updateToPastes(paste));
    }
    else{
      //no  pasteId is available so we need to create new
      dispatch(addToPastes(paste));
    }

    //cleaning opration
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='relative mr-auto ml-auto mt-12 flex flex-col bg-white p-4 w-[1100px] justify-center'>


      <div className="flex flex-row gap-7 place-content-between mt-2">
      
      <input 
        className='p-2 rounded-md h-[40px] w-[80%] pl-4 text-red-600 border-1 border-black shadow-2xl'
        type="text" 
        placeholder='enter title here' 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button 
        className="p-2 bg-blue-800 rounded-md h-[40px] w-[16%] pb-2 shadow-2xl hover:bg-sky-700"
        onClick={createPaste}
      >
        {pasteId ? "Update Paste" : "Crete My Paste"}
      </button>

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
          className='bg-gray-200 rounded-2xl min-w-[500px] p-4 mt-3 border border-black w-full'
          value={value}
          placeholder='enter content here'
          onChange={(e)=>setValue(e.target.value)}
          rows={20}
        />
      </div>


    </div>
  )
}

export default Home