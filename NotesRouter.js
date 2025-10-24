const router=require('express').Router()
const authMiddleware=require('../Middleware/NotesValidate')
const {add_note,get_all_notes,update_note,delete_node,get_note_by_id}=require('../Controllers/NotesController')

router.post('/notes',authMiddleware,add_note)
router.get('/notes',authMiddleware,get_all_notes)
router.put('/notes/:id',authMiddleware,update_note)
router.get('/notes/:id',authMiddleware,get_note_by_id)
router.delete('/notes/:id',authMiddleware,delete_node)
module.exports=router