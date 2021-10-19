const express = require("express");
const router = express.Router();
var FetchUser = require("../middleware/FetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route : 1 Get All the Notes using: GET "/api/notes/getuser": login required
router.get("/fetchallnotes", FetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

});

//Route : 2 Add a new Notes using: POST "/api/notes/addnote": login required
router.post(
    "/addnote",
    FetchUser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body(
            "description",
            "Description must be at least 5 characters long"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors, return an error message
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });


            const savednote = await note.save();
            res.json(savednote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
    }
)


//Route : 3 Update and exitsting Note using: PUT "/api/notes/updatenote": login required
router.put(
    "/updatenote/:id",
    FetchUser,async (req, res) => {
        try {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNote = {};

        if(title){newNote.title = title;}
        if(description){newNote.description = description;}
        if(tag){newNote.tag = tag;}


        // Find the note to be updated and it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
        res.json(note);
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
)


//Route : 4 Delete and exitsting Note using: delete "/api/notes/deletenote": login required
router.delete(
    "/deletenote/:id",
    FetchUser,async (req, res) => {
        try{
        
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        // Allowed deletion only if user owns this note
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note Has been Deleted"});
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
)


module.exports = router;
