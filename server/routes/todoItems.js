const router = require('express').Router();
//importing todo model

const todoItemsModel = require('../models/todoItems');

// Creating first route - adding Todo Item to my database
router.post('/api/item', async (req, res)=>{
    try{
        const newItem = new todoItemsModel({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            user: req.body.user,
        })
        // saving this item in database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    }catch(err){
        res.json(err);
    }
})


// exporting router

module.exports = router;