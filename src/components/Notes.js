import React,{useContext,useEffect,useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext  from '../context/noteContext';
import { Noteitem } from './Noteitem';
import { AddNote } from './AddNote';


export const Notes = (props) => {

    let history = useHistory();
    
    const context = useContext(noteContext);

    const {notes,GetAllNotes, editnote} = context;

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
        GetAllNotes();
        }else
        {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id: "" ,etitle:"" , edescription:"", etag: ""})
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title , edescription: currentNote.description , etag: currentNote.tag});
        // props.showAlert("Update Successfully", "success");
    }


    

    const handleClick = (e) => {
        editnote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Update Successfully", "success");
        // addnote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})

    }

     

    return (
        <>
        
        <AddNote showAlert={props.showAlert}/>
        <button ref={ref}  type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-hidden="true">
            
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-control" id="edescription"  value={note.edescription}  name="edescription" onChange={onChange} minLength={5} required/>
            </div>
           
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} minLength={5} required/>
            </div>
           
            </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

             
             <div className="row my-3">
           <h1>Your Notes</h1>
           {notes.map((note)=>{
               return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>;
        }) }
           </div>
       
        </>
    )
}
