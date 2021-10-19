import React,{useContext} from 'react'
import noteContext  from '../context/noteContext';

export const Noteitem = (props) => {

   const context = useContext(noteContext);

   const {deletenote} = context;
   const {note , updateNote} = props;


    return (
        <div className = "col-md-3">
            <div className="card my-3" >
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title} </h5>
                <i className="fas fa-trash-alt mx-2" onClick={()=>{deletenote(note._id); props.showAlert("Deleted Successfully", "success");}}></i>
                <i className="fas fa-edit  mx-2" onClick={()=>{updateNote(note);}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
          </div>
        </div>
    )
}