const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//handles http get request url path if you type http://localhost:5000/users/ if a get request then this will happen
router.route('/').get((req, res) => {
  // will find list of all exercise from the mongoose data base
  //results are returned in json format
  //exercises are returned in json format
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));//if error occurs then returns status 400 
});

//handles http post request /add post request
router.route('/add').post((req, res) => {
  //create a newuser
  const username = req.body.username;
  //ask for description
  const description = req.body.description;
  //ask for duration
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  //variable to store information into the database
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
//storing the new exercise in the database if error doesnot occur else printing the error
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//id is auomatically created by mongodb database,on a get request return information about the exercise 
router.route('/:id').get((req, res) => {
  //finding the id and returning as json file
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//to delete ,first finding and then removing from database
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//to update ,first finding and then updating in database
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);//converting duration to a number
      exercise.date = Date.parse(req.body.date);//converting to date
//creating a promise,if error occurs then printing the error
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;