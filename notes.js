const mongoose = require('mongoose')
const schema = mongoose.Schema

const notesSchema = new schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const Note = mongoose.model("Note", notesSchema)
module.exports = Note   