import React, {useState, useEffect} from 'react';
import { Divider, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import SidebarItem from '../sidebarItem/SidebarItem';
import styles from './styles';

function Sidebar({notes, classes, selectedNoteIndex, selectNote, createNote, deleteNote}){

    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);
    
    
    // useEffect(() =>{
    //     console.log(notes)
    // },[notes])

    const newNoteBtnClick = () => {
        setAddingNote(!addingNote);
        setTitle(null);
    }

    const newNote = async () =>{
        await createNote(title);
        setTitle(null);
        setAddingNote(false);
    }


        return(
            <div className={classes.sidebarContainer}>
                <Button
                    onClick={newNoteBtnClick}
                    className={classes.newNoteBtn}
                >
                    {addingNote ? 'Cancel Note' : 'New Note'}
                </Button>
                {
                    addingNote?
                        <div>
                            <input type="text"
                                className={classes.newNoteInput}
                                placeholder='Enter note title'
                                onKeyUp ={(e) => setTitle(e.target.value)}
                            />
                            <Button
                            className={classes.newNoteSubmitBtn}
                            onClick={newNote}                            
                            >
                                Sumbit Note
                            </Button>
                        </div>
                        
                    :
                        null                        
                }
                <List>
                    { 
                        notes?
                            notes.map((note, index) => {
                                return(
                                    <div key={index}>
                                    <SidebarItem 
                                        index={index}
                                        note={note}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={selectNote}
                                        deleteNote={deleteNote}
                                    />
                                    <Divider />
                                    {/* {note.body} */}
                                    </div>
                                    
                                )
                            })
                        :
                        null
                    }
                </List>
            </div>
        );
   
}

export default withStyles(styles)(Sidebar);
// export default Sidebar;