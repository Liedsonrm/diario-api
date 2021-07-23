const express = require('express')
const router = express.Router()
const pageSchema = require('./Schema/pageSchema')


router.get("/diario", (req, res) => {
    pageSchema.find({}, (err, items) => {
        return res.json(items)
    })
})

router.post('/diario', (req, res) => {
    var { title, content } = req.body
    var now = new Date();
    var day = now.getDate()
    var month = now.getMonth()+1
    var year = now.getFullYear()

    pageSchema.find({ date: `${day}-${month}-${year}`}, (err, items) => {
        if (items.length >= 1){
            return res.status(301).json({ received: true, accepted: false})
        } else{
            pageSchema.create({ title, content }, (err, page) => {
                if (err)
                    throw err
                return res.status(201).json(page)
            })
        }
    })
})

router.delete('/diario/:date', (req, res) => {
    var { date } = req.params
    pageSchema.deleteOne({date: date}, (err, items) => {
        if (err)
            throw err
        res.json({items})
    })
})

router.put("/diario/:date", (req, res) => {
    var { date } = req.params
    var { title, content } = req.body
    pageSchema.updateOne({date}, { title, content}, (err, items) => {
        if (err)
            throw err
        pageSchema.findOne({date}, (err, item) => {
            if (err)
                throw err
            res.status(200).json({item})
        })
    })
})

router.get('/diario/:date' , (req, res) => {
    var { date } = req.params
    pageSchema.find({date: date}, (err, docs) => {
        if(err)
            throw err
        res.json({docs})
    })
})



module.exports = router