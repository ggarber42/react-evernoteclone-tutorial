import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../helpers';

function SidebarItem({classes, index, note, selectedNoteIndex, selectNote, deleteNote}){


    return(
        <div key={index}>
            <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                alignItems='flex-start'
            >
                <div className={classes.textSection}
                     onClick={() => selectNote(note, index)}
                >
                    <ListItemText
                        primary={note.title}
                        secondary ={removeHTMLTags(note.body.substring(0,30)) + '...'}
                    />
                    <DeleteIcon
                        onClick={() => deleteNote(note)}
                        className={classes.deleteIcon}
                    />
                    
                </div>
            </ListItem>   
        </div>     
    )
}

export default withStyles(styles)(SidebarItem);