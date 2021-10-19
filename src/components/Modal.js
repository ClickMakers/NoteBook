import React, {ref} from 'react'

export const Modal = (props) => {

    
    
    setTimeout(() => {
        ref.current.click();
    }, 1000);

    return (

        <div>
           
            <button ref={props.ref}  type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            
            </button>
            <div class="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
      </div>
    )
}
