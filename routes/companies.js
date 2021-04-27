const { isValidObjectId } = require("mongoose");
const Company = require("../models/companies.model");
const User = require("../models/user.model");
const checkToken = require("./verifyToken");
const router = require("express").Router();

router.get('/', async (req, res) => {

    try {
        const findCompanies = await Company.find();

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
});

router.post('/add', checkToken, async (req, res) => {
    const user = req.user;

        const { name, imageURL, description } = req.body;
        const findCompanie = await Company.findOne({ name });
        if (findCompanie) {
            return res.status(400).json({
                succes: false,
                error: "Company name already exist"
            })
        }

        const newCompany = new Company({ name, imageURL, description, userID:user._id });
        const savedCompany = await newCompany.save();

        return res.status(200).json({
            succes: true,
            message: "Company was added",
        })
    
})

router.post('/edit/:companyID', checkToken, async (req, res) => {
    const user = req.user;
    const {companyID} = req.params;

    if(!isValidObjectId(companyID)){
        return res.status(200).json({
            succes: false,
            error: "Incorrect company ID",
        })
     }

        const { name, imageURL, description } = req.body;
        const findCompanie = await Company.findById(companyID);
        if (!!findCompanie) {
            if(findCompanie.userID == user._id){
                
                    
                findCompanie.name = name;
                findCompanie.imageURL = imageURL;
                findCompanie.description = description;                
                const savedCompany =  await findCompanie.save()
                
                return res.status(200).json({
                    succes: true,
                    message: "Company was changed",
                company: savedCompany,
            })

    }
}

    return res.status(200).json({
        succes: true,
        message: "You don't have this company",
    })
    
})


router.delete('/delete/:companyID', checkToken, async (req, res) => {
    const user = req.user;
    const {companyID} = req.params;

    if(!isValidObjectId(companyID)){
        return res.status(200).json({
            succes: false,
            error: "Incorrect company ID",
        })
     }

    const findCompanie = await Company.findById(companyID);
    if (findCompanie) {
        if(findCompanie.userID == user._id){

        await Company.findByIdAndDelete(companyID)
        
            return res.status(200).json({
                succes: true,
                message: "Company was deleted",
            })
    }
}
    return res.status(200).json({
        succes: true,
        message: "You don't have this company",
    })
    
});




module.exports = router;