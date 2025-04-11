import { createSlice } from '@reduxjs/toolkit'
import taste, { toast } from 'react-hot-toast'

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;
      
      // Check if title already exists
      const isTitleTaken = state.pastes.some(p => p.title.trim().toLowerCase() === paste.title.trim().toLowerCase());

      if (isTitleTaken) {
        toast.error("Title already exists. Please use a unique title.");
        return;
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast.success("paste created succefully");
    },
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);

      if(index >= 0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state,action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item)=> item._id === pasteId);
      
      if(index >= 0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste deleted");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer