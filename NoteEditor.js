import React from 'react'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar';
//import { handleError } from 'd:/NotesApp/frontend/src/utils/logger';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSuccess,handleError } from '../../Utils/Logger';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './NoteEditor.css'

const NoteEditor = () => {
    //const [notes,setNotes]=useState([]);
    const [note,setNote]=useState({
        title:"",
        details:"",
    })
    const navigate=useNavigate()
    const handleChange=async(e)=>{
        const {name,value}=e.target
        console.log(name,value)
        const copynotes={...note}
        copynotes[name]=value;
        setNote(copynotes)
    }
    const handleQuillChange = (value) => {
    setNote({ ...note, details: value });
  };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const token=localStorage.getItem('token')
        console.log(token)
        if(!token){
            handleError({msg:"Do not have permission to create note,Login again"})
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }

        const {title,details}=note;
        if (!title || !details ){
           handleError({message:"No title or description"})
        }
        try{
            const url="http://localhost:8080/api/notes"
        const result=await fetch(url,{
            method:'POST',
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': "application/json",

            },
            
            body:JSON.stringify(note)
        })
        const {message,success,error}= await result.json()
        if(error){
            const details = error?.details[0].message;
            handleError(details)
        }
        else if(success){
            handleSuccess(message)
            setTimeout(()=>{
                navigate('/home')
            },1000)
        }
        else{
           handleError(message)
        }

        }
        catch(err){
             handleError({ message: "Server error while creating note" });
        }
    }

  return (
    
    <>
      <Navbar />
      <div className="note-container">
        <div className="note-form-wrapper">
          <div className="note-header">
            <h1 className="note-title">Create Notes</h1>
          </div>
          <form className="note-form" onSubmit={handleSubmit}>
            <label className="form-label">Title</label>
            <input
              name="title"
              placeholder="Enter title"
              autoFocus
              onChange={handleChange}
              value={note.title}
              className="note-input"
            />
            <br />

            <label className="form-label">Details</label>
            <ReactQuill
              theme="snow"
              value={note.details}
              onChange={handleQuillChange}
              className="note-quill"
              placeholder="Write your note here..."
            />
            <br />

            <button className="add-note" type="submit">
              Create Note
            </button>
          </form>
        </div>
      </div>
    </>
    
  )
}

export default NoteEditor