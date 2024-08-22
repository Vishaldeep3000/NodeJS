const express = require('express');
const router = express.Router();

const Menu = require('./../models/menuItem');

//to add menu item
router.post('/', async (req, res) => {
    try{
        const data = req.body;

        const newItem = new Menu(data);

        const response = await newItem.save();
        console.log('New Item added !');
        res.status(200).json(response);

    }catch(error){
        console.log(' Error while saving menu item >> '+ error);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

//get menu Items
router.get('/', async (req, res) => {
    try{
        const data = await Menu.find();
        console.log('found all data for menu');
        res.status(200).json(data);
    }catch(error){
        console.log('Cound not load menu data '+error);
        res.status(500).json({error: 'Could not get menu data'});
    }
})

//get menu Items based on taste
router.get('/:taste', async (req, res) => {
    try{
        const data = await Menu.find({taste: taste});
        console.log('found all data for menu');
        res.status(200).json(data);
    }catch(error){
        console.log('Cound not load menu data '+error);
        res.status(500).json({error: 'Could not get menu data'});
    }
})

//update menu Item
router.put('/:menu_id', async (req, res) => {
    try{

        const menuItemId = req.params.menu_id;
        const updateRecord = req.body;

        const response = await Menu.findByIdAndUpdate(menuItemId, updateRecord, {
            new: true, //returns the update record
            runValidators: true //runs the database validation we did in the personDB file
        });

        if(!response){
            return res.status(404).json({ error : 'Menu Item not found '});
        }

        console.log('menu item update ');
        res.status(200).json({message : 'menu Item Update', response})

    }catch(error){
        console.log(' error while updating menu item record >> ', error);
        res.status(500).json({error : 'Internal Server error'});
    }
})

//to delete Menu item
router.delete('/:menu_id', async (req , res) => {
    try{
    const menuItemId = req.params.menu_id;
    
    const response = await Menu.findByIdAndDelete(menuItemId);
    
    if(!response){
        return res.status(404).json({error : 'Menu item not found' });
    }

    console.log('menu Item deleted');
    res.status(200).json({message : 'Record Deleted'});

    }catch(error){
        console.log('error while deleting menu item >> ', error);
        res.status(500).json({message : 'Internal Server Error'});
    }
})
//adding a comment to check
module.exports = router;
