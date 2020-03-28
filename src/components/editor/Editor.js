import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Editor({classes, selectedNote, notes, noteUpdate}){

    const [text, setText] = useState('');
    const [title, setTitle] = useState('')
    const [id, setId] = useState('');

    // useEffect(() =>{
    //     setTitle(notes.title);
    // },[title])

    useEffect(() =>{
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id)
    },[selectedNote])

    const updateBody = async (value) => {            
        await setText(value);
        update();
    }
  
    const update = debounce(() => {
        if(id){
            noteUpdate(id, title, text);
        }        
    },1500);

    const updateTitle = async (title) => {
        await setTitle(title);
        update();
    }

    return(        
        <div className={classes.editorContainer}>
            <BorderColorIcon
                className={classes.editIcon}
            />
            <input 
                className={classes.titleInput}
                placeholder='Note title...'    
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
            />
            <ReactQuill 
                value={text}
                onChange={updateBody}
            />
        </div>
    )

}

export default withStyles(styles)(Editor);