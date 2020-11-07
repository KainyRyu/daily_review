const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
    const { name, email, fuid } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ fuid: fuid });
    } catch (err) {
        const error = new HttpError('Something went wrong, try again later', 500);
        return next(error);
    }

    if (existingUser) {
        res.json({
            message: 'Signed in!',
            user: existingUser.toObject({ getters: true })
        });
    }

    const createdUser = new User({
        name, email, fuid
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError ('Login failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true })});
}

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '');
    } catch (err) {
        const error = new HttpError ('Fetching users failed, please try again later.', 500);
        return next(error);
    }
    res.json({ users: users.map(u => u.toObject({ getters: true }))});
}

const signin = async (req, res, next) => {
    const { email, fuid } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Signing in failed, please try again later', 500);
        return next(error);
    }
    
    if (!existingUser || existingUser.fuid !== fuid) {
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }  
    // if there's a user then sign in if not send an error
    res.json({
        message: "Signed in!",
        user: existingUser.toObject({ getters: true })
    });
}

exports.signup = signup;
exports.getAllUsers = getAllUsers;
// exports.signin = signin;