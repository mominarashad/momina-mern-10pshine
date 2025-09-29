const mongoose = require('mongoose')

const MONGO_URl = process.env.MONGO_URI

mongoose.connect(MONGO_URl)
   .then(() => {
      console.log("Connected to MongoDb successfully!")
   })
   .catch((err) => {
      console.log("Unable to made mongo connection!", err)
   });