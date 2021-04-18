require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

//conectare MONGODB
const uri = process.env.ARLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo DB connect success');
});
const exercisesRouter = require('./routes/exercises');
const authRouter = require('./routes/auth');

app.use('/api/exercises',exercisesRouter);
app.use('/api/auth',authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port port!`)
});

