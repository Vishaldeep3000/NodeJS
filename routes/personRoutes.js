const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

//to add Person record
router.post('/', async (req, res) => {
    try{
        const data = req.body //Assuming the request body contains the person data

        //create a new person document using the mongoosse model
        const newPerson = new Person(data);

        //save the new person to DB
        const response = await newPerson.save();
        console.log('person Data saved !');
        res.status(200).json(response);

    }catch(err){

        console.log(' Error while saving person >> ', err);
        res.status(500).json({error : 'Internal Server Error'});

    }
})

//get person records
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('found all data for person');
        res.status(200).json(data);
    }catch(error){
        console.log('Cound not load person data '+ error);
        res.status(500).json({error : 'Could not get person data'});

    }
})

//To get person WRT work Type
router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType; //the workType we sent
        if(workType == 'chef' || workType == 'chef' || workType == 'chef' ){

            const response = await Person.find({work : workType});
            console.log('response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error : 'Invalid work type '});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Could not get data of persons '});
    }
})

//to update perso record
router.put('/:id_prsn', async (req, res) => {
    try{
        const perID = req.params.id_prsn; //finding with person It pased as params
        const updatePersonData = req.body; //geting the update person record from body

        const response = await Person.findByIdAndUpdate(perID, updatePersonData, {
            new: true, //returns the update record
            runValidators: true //runs the database validation we did in the personDB file
        });

        if(!response){
            return res.status(404).json({error : 'Person reocord not found '});
        }

        console.log('data updated ');
        res.status(200).json(response);
    }catch(error){
        res.status(500).json('Internal serve error ! ');
        console.log('error while updating person record >> ', error);
    }
})

//to delete peson record
router.delete('/:id_per', async (req, res) => {
    try{

        const perID = req.params.id_prsn; 
        const response = await Person.findByIdAndDelete(perID);

        if(!response){
            return res.status(404).json({error : 'Person record not found '});
        }

        console.log('deleted');
        res.status(200).json({message : 'person record deleted successfully ! '});
    }catch(error){
        res.status(500).json('Internal server error ! ');
        console.log('error while deleteing person record >> ', error);
    }
})


router.post('/person-perviousMtd', (req, res) => {
    const data_person = req.body //Assuming the request body contains the person data
    
    //creating a new person document using
    /*const newPerson = new Person();
    newPerson.name = data_person.name;
    newPerson.age = data_person.age;
    newPerson.work = data_person.work;
    newPerson.mobile = data_person.mobile;
    newPerson.email = data_person.email;
    newPerson.address = data_person.address;
    newPerson.salary = data_person.salary;
    can also be written as*/

    const newPerson = new Person(data_person);

    //Saving the new Person data to DB
    //Saving data in callback is bit complicated , lets use Async Await
    /*newPerson.save((error, savedPerson) => {
        if(error){
            console.log('error saving person : '+ error);
            res.status(500).json({error: 'Internal Server Error'});
        }else{
            console.log('data saved successfully');
            res.status(200).json(savedPerson);
        }
    })*/

})

module.exports = router;