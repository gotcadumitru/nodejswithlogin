const {
    Schema,
    Mongoose,
    model
} = require("mongoose");

const ServiceSchema = new Schema({
    name: String,

    description: String,

    duration: Number,

    description: String,

    price: Number,

    aviability: [
        {
            dayOfWeek: String,
            startHour: String,
            endHour: String,
            periods: Array,
        },
    ]



    

}, {
    timestamps: true,
});

const Service = model('Service', ServiceSchema);

module.exports = Service;