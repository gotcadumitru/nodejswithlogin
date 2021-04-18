const Exercise = require("../models/exercise.model");
const User = require("../models/user.model");
const checkToken = require("./verifyToken");
const router = require("express").Router();

router.get('/', checkToken,async (req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    newExercise.save()
        .then(() => {
            return res.json('Exercise added!');

        })
        .catch(err => {
            return res.status(400).json('Error ' + err);

        })
})


router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise =>{
        return res.json(exercise);
    }).catch(err=> res.status(400).json("Error: " + err));
});
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise =>{
        return res.json("Exercice deleted");
    }).catch(err=> res.status(400).json("Error: " + err));
});
router.route('/:id').post((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise =>{
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save()
        
        return res.json("Exercice updated");
    }).catch(err=> res.status(400).json("Error: " + err));
});


module.exports = router;