import NoteContext  from "./noteContext";
import React,{useState } from 'react'

 const NoteState = (props) => {

    const host = "http://localhost:5000";

     const notesinitial = []
    


          const [notes, setNotes] = useState(notesinitial)
   

          // Get All notes 
          const GetAllNotes = async () => {

            //  API CALL
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET', 
                headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                
                },
            });
            const Json = await response.json(); 
            setNotes(Json);
        }


          // Add a new note 
          const addnote = async (title, description, tag) => {
            //  API CALL
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                
                },
                body: JSON.stringify({title, description, tag}) 
            });
            const note = await response.json(); 
            setNotes(notes.concat(note));
            

          }


          // delete a note 
          const deletenote = async (id) => {
             // API CALL
             const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE', 
                headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
                
                },
                
            });
            const Json = await response.json(); 
            console.log(Json);


           const newNote = notes.filter((note) => {return note._id !== id});
           setNotes(newNote);

        }

          // edit a note
          const editnote = async (id, title, description, tag) => {
                //  API CALL
                const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                    method: 'PUT', 
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNjZhOGE2ZGEwMzg3NmMzNDgwNjBiIn0sImlhdCI6MTYzMDk4MTk0M30.sq51Ctljrkre-A071ZGjSDD1emxpW8nj5H0q9YfHEWY'
                      
                    },
                      body: JSON.stringify({title, description, tag}) 
                  });
                  const Json = await response.json(); 
                  console.log(Json);

                  let newNotes = JSON.parse(JSON.stringify(notes));
                // login to edit in client
            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
            }
            
            }
            setNotes(newNotes);
        } 

return (

    <NoteContext.Provider value={{notes,addnote,deletenote,editnote ,GetAllNotes}}>

        {props.children}
        
    </NoteContext.Provider>

)

}

export default NoteState