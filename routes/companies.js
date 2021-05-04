const { isValidObjectId } = require("mongoose");
const { find } = require("../models/companies.model");
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
            data: savedCompany,
        })
    
})

router.post('/edit/:companyID', checkToken, async (req, res) => {
    const user = req.user;
    const {companyID} = req.params;

    if(!isValidObjectId(companyID)){
        return res.status(200).json({
            succes: false,
            error: "Incorrect company ID",
        });
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

router.post('/addService/:companyID', checkToken, async (req, res) => {
    const user = req.user;
    const {companyID} = req.params;
    const { services} = req.body;
    try{

        const findCompanie = await Company.findById(companyID);
        if (findCompanie) {
            
            findCompanie.services.push(...services)
            const savedCompany = await findCompanie.save();
            return res.status(200).json({
                succes: true,
                message: "Service was added",
            });

            
            
        }
        return res.status(400).json({
            succes: false,
            message: "Service error",
        });
    }catch(err){
        return res.status(200).json({
            succes: false,
            message: err,
        });
    }
})

router.post('/editServices/:companyID', checkToken, async (req, res) => {
    const user = req.user;
    const {companyID} = req.params;
    const { services,servicesID} = req.body;
    try{

        const findCompanie = await Company.findById(companyID);
        if (findCompanie) {
            
            findCompanie.services = findCompanie.services.map(service=>{
                const searchServiceIndex = servicesID.indexOf(service._id.toString());
                console.log(servicesID);
                console.log(searchServiceIndex);
                console.log(service._id.toString());
                if(searchServiceIndex!==-1){
                    return services[searchServiceIndex];
                }
                return service


            })
            console.log(findCompanie.services[0]);
            const savedCompany = await findCompanie.save();
            return res.status(200).json({
                succes: true,
                message: "Service was changed",
            });

            
            
        }
        return res.status(400).json({
            succes: false,
            message: "Service error",
        });
    }catch(err){
        return res.status(200).json({
            succes: false,
            message: err,
        });
    }
})




module.exports = router;