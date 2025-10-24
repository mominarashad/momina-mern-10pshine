const Note =require('../Models/notes')
//const { findOneAndDelete } = require('../Models/User')
const logger = require('../Utils/logger')


const add_note=async(req,res)=>{
    try{
        const {title,details,types,user}=req.body
        let note= new Note({
            title,
            details,
            types,
            user:req.user._id

        })
        await note.save()
            logger.info("notes created successfully!")
            res.status(200)
            .json({
                message:"Notes added successfully!",
                success:true,
                content:note
            })
        
    }
    catch(err){

    }
    
}

//retrieve all notes

const get_all_notes = async (req, res) => {
  if (!req.user || !req.user._id) {
    logger.warn("Unauthorized access — no user attached to request");
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  try {
    const userId = req.user._id;
    const notes = await Note.find({ user: userId }).sort({ created_at: -1 });

    if (!notes || notes.length === 0) {
      logger.warn("No notes found for this user");
      return res.status(404).json({
        message: "No notes found for this user",
        success: false,
      });
    }

    res.status(200).json({
      message: "Notes fetched successfully!",
      content: notes,
      success: true,
    });
  } catch (err) {
    logger.error("Error finding notes!", { err });
    res.status(500).json({
      message: `Error finding notes! ${err.message}`,
      success: false,
    });
  }
};


const update_note=async(req,res)=>{
    try{
        const {id}=req.params
        const {title,details,types}=req.body
           
        const updateNote=await Note.findOneAndUpdate(
            {_id:id,
                user:req.user?._id
            },
            {title,details,types},
            {new:true}
        )
        if(!updateNote){
            logger.warn("Note not found or not authorized")
            return res.status(404)
            .json({
                message:"Note not found or not authorized",
                success:false
            })
        }
        logger.info("Notes updated successfully!")
        res.status(200)
        .json({
            message:"Notes updated successfully!",
            success:true
        })

    }
    catch(err){
        logger.error("Something went wrong",{err})
        res.status(500)
        .json({
            message:`Something went wrong ${err}`,
            success:false
        })
    }
}

const delete_node=async(req,res)=>{
    try{
        const {id}=req.params

    const delNote=await Note.findOneAndDelete(
        {
            _id:id,
            user:req.user._id
        }
    )

    if (!delNote){
        logger.warn("Unable to delete the note or no authorization")
        return res.status(404)
        .json({
            message:"Unable to delete the note or no authorization",
            success:false
        })
    }
    logger.info("Note deleted successfully!")
    res.status(200)
    .json({
        message:"Note deleted successfully",
        success:true
    })
    }
    catch(err){
         logger.error("Something went wrong",{err})
        res.status(500)
        .json({
            message:`Something went wrong ${err}`,
            success:false
        })
    }
}
const get_note_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user._id : null; 
    //console.log(id)

    if (!userId) {
      logger.warn("Unauthorized access attempt");
      return res.status(401).json({
        message: "Unauthorized access",
        success: false
      });
    }

    const note = await Note.findOne({
      _id: id,
      user: userId
    });

    if (!note) {
      logger.warn("Note not found or not authorized");
      return res.status(404).json({
        message: "Note not found or not authorized",
        success: false
      });
    }

    logger.info("Note fetched successfully!");
    res.status(200).json({
      message: "Note fetched successfully!",
      note,
      success: true
    });
  } catch (err) {
    logger.error("Error fetching note", { err });
    res.status(500).json({
      message: `Error fetching note: ${err.message}`,
      success: false
    });
  }
};


module.exports={add_note,get_all_notes,update_note,delete_node,get_note_by_id}