const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pageSchema =  new Schema({
    title: String,
    content: String,
    date: {
        type: String,
        default: () => {
            now = new Date();
            day = now.getDate()
            month = now.getMonth()
            year = now.getFullYear()
            return `${day}-${month+1}-${year}`
        }
    }
})

module.exports = mongoose.model('Pages', pageSchema)
