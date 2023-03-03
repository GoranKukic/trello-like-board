const router = require('express').Router();
//importing todo model

const todoItemsModel = require('../models/todoItems');

// Creating first route - adding Todo Item to database
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

// Creating second route - getting data from database

router.get('/api/items', async (req, res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({

        });
        res.status(200).json(allTodoItems)
    }catch(err){
      res.json(err);  
    }
})

// Updating item using its id
router.put('/api/item/:id', async (req, res)=>{
    try{
        // finding item by id and updating it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set:req.body});
        res.status(200).json('Item updated');
    }catch(err){
        res.json(err);
    }
})


// Deleting item from database
router.delete('/api/item/:id', async (req, res)=>{
  try{
    //finding item by id and deleting it
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  }catch(err){
    res.json(err);
  }
})


// exporting router
module.exports = router;