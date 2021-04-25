const Company = require("../models/companies.model");
const User = require("../models/user.model");
const checkToken = require("./verifyToken");
const router = require("express").Router();

router.get('/', checkToken, async (req, res) => {
    // if (req.user) {





    try {
        const findCompanies = await User.find();
        console.log(findCompanies);

        res.status(200).json({
            succes: true,
            companies: [...findCompanies]

        })
    } catch (err) {

        console.log(err)
        res.status(400).json({
            succes: false,
            error: "Not authorized"

        })

    }
    // }else{

    // }

});

router.post('/add', checkToken, async (req, res) => {
    const user = req.user;

        const { name, imageURL, description, servicesid } = req.body;
        const findCompanie = await Company.findOne({ name });
        console.log(findCompanie)
        if (findCompanie) {
            return res.status(400).json({
                succes: false,
                error: "Company name already exist"
            })
        }

        const newCompany = new Company({ name, imageURL, description, servicesid:[] });
        const savedCompany = await newCompany.save();

        return res.status(200).json({
            succes: true,
            data: savedCompany,
        })
        
    




})


router.route('/:id').get((req, res) => {

});
router.route('/:id').delete((req, res) => {

});
router.route('/:id').post((req, res) => {

});


module.exports = router;