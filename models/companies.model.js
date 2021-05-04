const {
    Schema,
    Mongoose,
    model
} = require("mongoose");

const ServiceSchema = new Schema({
    name: String,

    description: String,

    duration: Number,

    price: Number,
    
    space: Number,

    workTime: Array,
    periods: {
            byAdmin: [],
            byGuests: [],
        },
});

const CompanySchema = new Schema({
    name: String,
    userID: String,
    imageURL: String,
    description: String,
    services: [ServiceSchema],
}, {
    timestamps: true,
});



const Company = model('Company', CompanySchema);

module.exports = Company;