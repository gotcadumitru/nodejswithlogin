const { hash } = require('bcryptjs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendMail } = require('../utils/sendMail');
const { registerValidate, loginValidate } = require('../validation');
const checkToken = require('./verifyToken');
const router = require('express').Router();

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const { error } = registerValidate(req.body);

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        return res.status(400).json({
            succes: false,
            error: 'Email already exist',
        })
    }
    if (error) {
        return res.status(400).json({
            succes: false,
            error: error.details[0].message,
        });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword })
    try {
        const savedUser = await newUser.save()

        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({
            succes: true,
            user: savedUser,
            token: token,
        })
    } catch (err) {
        res.status(400).json({
            succes: false,
            error: err,
        });;
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).json({
            succes: false,
            error: error.details[0].message,
        })
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({
            succes: false,
            error: 'Email is not found',
        })
    }
    const validPass = await bcrypt.compare(password, user.password)
    if (!validPass) {
        return res.status(400).json({
            succes: false,
            error: 'Invaid password',
        });
    }

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
        succes: true,
        token: token,
    })
});


router.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;
    try {
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            return res.status(404).json({
                succes: false,
                error: 'Email could not be send',
            });
        }
        const resetToken = crypto.randomBytes(20).toString('hex');
        findUser.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
        const savedUser = await findUser.save();

        const resetUrl = `http://localhost:3000/auth/resetpassword/${resetToken}`;

        const message = `
        <h1>You have requested a new password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off >${resetUrl}</a>
        `
        try {
            await sendMail({
                to: savedUser.email,
                subject: "Password Reset",
                text: message,
            })
            res.status(200).json({
                succes: true,
                text: 'Email was send'
            })
        } catch (err) {
            findUser.resetPasswordToken = undefined;
            await findUser.save();

            res.status(400).json({
                succes: false,
                error: 'Email could not be send'
            })
        }

    } catch (err) {
        res.status(400).json({
            succes: false,
            error: 'Other Error'
        })
    }
})
router.post('/resetpassword/:resetToken', async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const findUser = await User.findOne({ resetPasswordToken });
        if (!findUser) {
            return res.status(400).json({
                succes: false,
                error: 'Invalid reset Token'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await hash(req.body.password, salt);
        findUser.password = hashedPassword;

        findUser.resetPasswordToken = undefined;
        await findUser.save();
        return res.status(200).json({
            succes: true,
            data: 'Password Reset Succes'
        })
    } catch (error) {
        return res.status(400).json({
            succes: false,
            error: "error"
        })

    }
});

router.get('/me', checkToken,async (req, res) => {
    if(req.user){
        res.status(200).json({
            succes: true,
            user: req.user,
        })
    }else{
        return res.status(400).json({
            succes: false,
            error: "Acces denied"
        })
        }
});

module.exports = router;