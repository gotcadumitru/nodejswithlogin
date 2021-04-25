const {
    Schema,
    Mongoose,
    model
} = require("mongoose");

const CompanySchema = new Schema({
    name: String,
    imageURL: String,
    description: String,
    servicesid: Array,
}, {
    timestamps: true,
});

const Company = model('Company', CompanySchema);

module.exports = Company;