// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import { handleError, handleSuccess } from '../../Utils/Logger';
// import axios from 'axios';
// import Navbar from '../Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchNotes = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const response = await axios.get('http://localhost:8080/api/notes', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         setNotes(response.data.content || []);
//       } else {
//         handleError({ message: response.data.message || 'Failed to fetch notes' });
//       }
//     } catch (err) {
//       handleError({ message: err.response?.data?.message || 'Error fetching notes' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this note?');
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         handleError({ message: 'Failed to authorize' });
//         navigate('/login');
//         return;
//       }

//       const response = await axios.delete(`http://localhost:8080/api/notes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success) {
//         handleSuccess({ message: 'Note deleted successfully!' });

//         // ✅ Optimistically update UI
//         setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
//       } else {
//         handleError({ message: response.data.message || 'Unable to delete the note' });
//       }
//     } catch (err) {
//       handleError({ message: 'Error deleting note' });
//     }
//   };

//   // ------------------ UI ------------------

//   return (
//     <>
//       <Navbar />
//       <div className="dashboard">
//         <div className="dashboard-content">
//           <h2 className="dashboard-title">My Notes</h2>

//           {loading ? (
//             <p className="loading-text">Loading your notes...</p>
//           ) : notes.length === 0 ? (
//             <p className="no-notes">No Notes to show</p>
//           ) : (
//             <div className="notes-grid">
//               {notes.map((note) => (
//                 <div key={note._id} className="note-card">
//                   <h3 className="note-titles">{note.title}</h3>
//                   <div
//                     className="note-details"
//                     dangerouslySetInnerHTML={{ __html: note.details }}
//                   ></div>
//                   <div className="note-footer">
//                     <button
//                       className="view-btn"
//                       onClick={() => navigate(`/edit-notes/${note._id}`)}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => handleDelete(note._id)}
//                     >
//                       🗑 Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { handleError, handleSuccess } from '../../Utils/Logger';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //  Fetch all notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:8080/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setNotes(response.data.content || []);
      } else {
        handleError({ message: response.data.message || 'Failed to fetch notes' });
      }
    } catch (err) {
      handleError({ message: err.response?.data?.message || 'Error fetching notes' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //  SEARCH FUNCTION
  const handleSearch = async (query) => {
    if (!query.trim()) {
      // empty → show all notes again
      fetchNotes();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/notes/find?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setNotes(Array.isArray(response.data.content) ? response.data.content : [response.data.content]);

      } else {
        setNotes([]); // clear if no match
        handleError({ message: response.data.message || 'No notes found' });
      }
    } catch (err) {
      handleError({ message: 'Error searching notes' });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleError({ message: 'Failed to authorize' });
        navigate('/login');
        return;
      }

      const response = await axios.delete(`http://localhost:8080/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        handleSuccess({ message: 'Note deleted successfully!' });
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        handleError({ message: response.data.message || 'Unable to delete the note' });
      }
    } catch (err) {
      handleError({ message: 'Error deleting note' });
    }
  };

  return (
    <>
      {/*  Pass handleSearch to Navbar */}
      <Navbar onSearch={handleSearch} />
      <div className="dashboard">
        <div className="dashboard-content">
          <h2 className="dashboard-title">My Notes</h2>

          {loading ? (
            <p className="loading-text">Loading your notes...</p>
          ) : notes.length === 0 ? (
            <p className="no-notes">No Notes to show</p>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note._id} className="note-card">
                  <h3 className="note-titles">{note.title}</h3>
                  <div
                    className="note-details"
                    dangerouslySetInnerHTML={{ __html: note.details }}
                  ></div>
                  <div className="note-footer">
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/edit-notes/${note._id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(note._id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
