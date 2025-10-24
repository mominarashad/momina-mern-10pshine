import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { handleSuccess, handleError } from '../../Utils/Logger';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './EditNotes.css'

const EditNotes = () => {
  const [note, setNote] = useState({
    title: "",
    details: "",
  })
  const { id } = useParams()
  const navigate = useNavigate()
  //console.log(id)
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        handleError("Need Authorization to edit")
        navigate('/login')
        return
      }
      try {

        const url = `http://localhost:8080/api/notes/${id}`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })


        const noteData = response.data?.note;
        if (noteData) {
          setNote({
            title: noteData.title || "",
            details: noteData.details || ""
          });
        } else {
          handleError("No note found for this ID");
        }

      } catch (err) {
        handleError("Failed to fetch note")
      }
    }

    fetchNotes();
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    const copynotes = { ...note }
    copynotes[name] = value;
    setNote(copynotes)
  }

  const handleQuillChange = (value) => {
    setNote({ ...note, details: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      handleError("Do not have permission to create note, Login again")
      setTimeout(() => {
        navigate('/login')
      }, 1000)
      return
    }

    const { title, details } = note;
    if (!title || !details) {
      handleError("No title or description")
      return
    }

    try {

      const url = `http://localhost:8080/api/notes/${id}`
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ title, details })
      })

      const { message, success, error } = await result.json()
      if (error) {
        const details = error?.details?.[0]?.message || "Update failed"
        handleError(details)
      }
      else if (success) {
        handleSuccess(message)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      }
      else {
        handleError(message)
      }

    } catch (err) {
      handleError("Server error while updating note");
    }
  }

  return (
    <>
      <Navbar />
      <div className="note-container">
        <div className="note-form-wrapper">
          <div className="note-header">
            <h1 className="note-title">Edit Notes</h1>
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
              Submit Note
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditNotes;
