const Company = require("../models/companies.model");
const Service = require("../models/service.model");
const User = require("../models/user.model");
const checkToken = require("./verifyToken");
const router = require("express").Router();

router.get('/:companyID', async (req, res) => {

    try {
        const findCompany = await Company.findById(companyID);
        if(findCompany){

        }
        
    } catch (err) {

        console.log(err)
        res.status(400).json({
            succes: false,
            error: "Not authorized"

        })

    }

});

router.post('/add', checkToken, async (req, res) => {
    const user = req.user;

        const { name, imageURL, description, servicesid } = req.body;
        const findCompanie = await Company.findOne({ name });
        if (findCompanie) {
            return res.status(400).json({
                succes: false,
                error: "Company name already exist"
            })
        }

        const newCompany = new Company({ name, imageURL, description, servicesid, });
        const savedCompany = await newCompany.save();
        user.companiesID = [...user.companiesID, savedCompany._id];
        await user.save();
        return res.status(200).json({
            succes: true,
            message: "Company was added",
        })
    
})

router.post('/edit/:companyID', checkToken, async (req, res) => {
   
    
})


router.delete('/delete/:companyID', checkToken, async (req, res) => {
  
    
});




module.exports = router;