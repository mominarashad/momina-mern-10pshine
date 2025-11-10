const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const authMiddleware = require('../Middleware/NotesValidate')
const { get_user, update_user } = require('../Controllers/UserController')

//  Make sure upload folder exists
const uploadDir = path.join(__dirname, '../uploads/profile_pics')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

//  Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

//  Routes
router.get('/profile', authMiddleware, get_user)
router.put('/update', authMiddleware, upload.single('profilePicture'), update_user)

module.exports = router
