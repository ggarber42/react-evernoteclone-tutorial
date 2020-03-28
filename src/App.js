import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import Sidebar from './components/sidebar/Sidebar';
import Editor from './components/editor/Editor';



function App() {

  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map( doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        setNotes(notes);
      })
      // setSelectedNote(notes[notes.length - 1]);
      // setSelectedNoteIndex(notes.length - 1);
  },[]);




  const selectNote = (note, index) =>{
    setSelectedNote(note);    
    setSelectedNoteIndex(index);    
  }

  const noteUpdate = (id, title, text) =>{
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title,
        body: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  const createNote = async (title) => {
  
    const newNote = {
      title,
      body: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
   
    const newNoteFromDB = await firebase
      .firestore()
      .collection('notes')
      .add(newNote);

  };

  const deleteNote = async (note) =>{
    if(window.confirm(`Are you sure you want to delete: ${note.title}?`)){
      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete();
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNote={selectNote}
        createNote={createNote}
        deleteNote={deleteNote}
      />
      { selectedNote?
          <Editor 
          selectedNote={selectedNote}
          notes={notes}
          noteUpdate={noteUpdate}
        />
        :
        null
      }
      
    </div>
  );
}

export default App;
