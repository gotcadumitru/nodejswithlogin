const { hash } = require('bcryptjs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { sendMail } = require('../utils/sendMail');
const { registerValidate, loginValidate } = require('../validation');
const checkToken = require('./verifyToken');
const { OAuth2Client } = require('google-auth-library');
const { default: fetch } = require('node-fetch');
const router = require('express').Router();

const client = new OAuth2Client("1057553385734-97f7heo0s1n4gvpvqa9q8qf6iati0rtd.apps.googleusercontent.com");

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
    const isAccConfirmed = false;

    const confirmToken = crypto.randomBytes(20).toString('hex');

    const confirmRegisterToken = crypto.createHash("sha256").update(confirmToken).digest('hex');
    const newUser = new User({ name, email, password: hashedPassword,isAccConfirmed,confirmRegisterToken})

    try {
        const savedUser = await newUser.save()
        const resetUrl = `https://localhost:3000/auth/confirmRegister/${confirmToken}`;

        const message = `
        <h1>You have requested a registration</h1>
        <p>Please go to this link to confirm your email</p>
        <a href=${resetUrl} clicktracking=off >${resetUrl}</a>
        `
        try {
            await sendMail({
                to: savedUser.email,
                subject: "Confirm Registration",
                text: message,
            })
        } catch (err) {
            findUser.resetPasswordToken = undefined;
            await findUser.save();

            res.status(400).json({
                succes: false,
                error: 'Email could not be send'
            })
        }
        
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
        res.json({
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
            error: '"Password" or email is invalid',
        });
    }

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({
        succes: true,
        token: token,
    })
});

router.post('/googlelogin', async (req, res) => {

    const tokenId = req.body.token;
    client.verifyIdToken({ idToken: tokenId, audience: "1057553385734-97f7heo0s1n4gvpvqa9q8qf6iati0rtd.apps.googleusercontent.com" }).then(
        async response => {

            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                try {
                    const user = await User.findOne({ email: email })
                    if (!!user) {

                        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                        res.status(200).json({
                            succes: true,
                            token: token,
                        })
                    } else {
                        const password = email + process.env.TOKEN_SECRET;
                        const isAccConfirmed = true;
                        let newUser = new User({ name, email, password,isAccConfirmed });
                        try {
                            const newSavedUser = await newUser.save()

                            const token = jwt.sign({ _id: newSavedUser._id }, process.env.TOKEN_SECRET);
                            res.status(200).json({
                                succes: true,
                                token: token,
                            })
                        } catch (err) {
                            res.status(400).json({
                                succes: false,
                                error: 'Somthing was wrong1'
                            })
                        }
                    }
                } catch (err) {

                    res.status(400).json({
                        succes: false,
                        error: 'Somthing was wrong2'
                    })
                }
            }
        }
    )
});

router.post('/facebooklogin', async (req, res) => {

    const { accessToken, userID } = req.body;
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    try {
        const resJSON = await fetch(urlGraphFacebook, {
            method: "GET"
        })
        try {
            const response = await resJSON.json();
            const { email, name } = response;
            if (email) {

                try {
                    const user = await User.findOne({ email: email })
                    if (!!user) {

                        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
                        return res.status(200).json({
                            succes: true,
                            token: token,
                        })
                    } else {

                        const password = email + process.env.TOKEN_SECRET;
                        const isAccConfirmed = true;
                        let newUser = new User({ name, email, password,isAccConfirmed });
                        try {
                            const newSavedUser = await newUser.save()

                            const token = jwt.sign({ _id: newSavedUser._id }, process.env.TOKEN_SECRET);
                            res.status(200).json({
                                succes: true,
                                token: token,
                            })
                        } catch (err) {
                            res.status(400).json({
                                succes: false,
                                error: 'Somthing was wrong1'
                            })
                        }
                    }
                } catch (err) {

                    res.status(400).json({
                        succes: false,
                        error: 'Somthing was wrong2'
                    })
                }
            } else {

                res.status(400).json({
                    succes: false,
                    error: 'Somthing was wrong3'
                })
            }

        } catch (err) {
            res.status(400).json({
                succes: false,
                error: 'Somthing was wrong4'
            })
        }
    } catch (err) {

        res.status(400).json({
            succes: false,
            error: 'Somthing was wrong5'
        })
    }

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

        const resetUrl = `https://localhost:3000/auth/resetpassword/${resetToken}`;

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
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).json({
            succes: false,
            error: error.details[0].message,
        })
    }
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
router.post('/confirmRegister/:confirmRegisterToken', async (req, res) => {

    const confirmRegisterToken = crypto.createHash("sha256").update(req.params.confirmRegisterToken).digest("hex");

    try {
        const findUser = await User.findOne({ confirmRegisterToken });
        if (!findUser) {
            return res.status(400).json({
                succes: false,
                error: 'Invalid Confirm Register Token'
            })
        }

        findUser.isAccConfirmed = true;
        findUser.confirmRegisterToken = "";
        await findUser.save();
        return res.status(200).json({
            succes: true,
            data: 'Account succesful confirmed'
        })
    } catch (error) {
        return res.status(400).json({
            succes: false,
            error: "error"
        })

    }
});

router.get('/me', checkToken, async (req, res) => {
    if (req.user) {
        res.status(200).json({
            succes: true,
            user: {
                name: req.user.name,
                email: req.user.email,
                isAccConfirmed: req.user.isAccConfirmed,

            },
        })
    } else {
        return res.status(400).json({
            succes: false,
            error: "Acces denied"
        })
    }
});

module.exports = router;