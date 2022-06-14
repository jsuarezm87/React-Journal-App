import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active: currentNote } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote(currentNote) );
    }

    const handlePictureClick = () => {   
        document.querySelector('#fileSelector').click();      
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        
        if ( file ) {
            dispatch( startUploading(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>10 de mayo 2022</span>

            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none'}}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
