const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const Plan = require('../models/plan');
const User = require('../models/user');


const getPlansByUid = async (req, res, next) => {
    const uid = req.params.uid;
    
    let user;
    try {
        user = await User.findById(uid);
    } catch (err) {
        const error = new HttpError('Could not find the user', 404);
        return next(error);
    }
    
    let plans;
    try {
        plans = await Plan.find({ uid: uid });
    } catch (err) {
        const error = new HttpError('Could not find a plan. please add plans', 404);
        return next(error);
    }
    
    if (!plans || plans.length === 0) {
        const error = new HttpError(`You haven't added a plan yet, please add plans`, 404);
        return next(error);
    }
    
    
    res.json({plans: plans.map(plan => plan.toObject({ getters: true }))});
}

const addPlan = async (req, res, next) => {
    const { title, starts, ends, uid } = req.body;
    const createdPlan = new Plan ({
        title, starts, ends, uid
    });

    let user;
    try {
        user = await User.findById(uid);
        console.log(`plans-controllers.js user: ${user}`);

    } catch (err) {
        const error = new HttpError('Could not find the provided user id', 404);
        return next(error);
    }

    console.log(createdPlan);

    try {
        await createdPlan.save();
    } catch (err) {
        const error = new HttpError('Adding plan failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ plans: createdPlan.toObject({ getters: true }) });

}

const updatePlan = async (req, res, next) => {
    const { title, starts, ends } = req.body;
    const planId = req.params.pid;

    let plan;
    try {
        plan = await Plan.findById(planId);
    } catch (err) {
        const error = new HttpError('Could not find the plan', 404);
        return next(error);
    }

    plan.title = title;
    plan.starts = starts;
    plan.ends = ends;

    try {
        await plan.save();
    } catch(err) {
        const error = new HttpError(`Something went wrong, could not update`, 500);
        return next(error);
    }

    res.status(200).json({ plan })
}

const deletePlan = async (req, res, next) => {
    const pid = req.params.pid;

    let plan;
    try {
        plan = await Plan.findById(pid);
    } catch (err) {
        const error = new HttpError('Something went wrong. Try again later', 500);
        return next(error);
    }

    if (!plan) {
        const error = new HttpError ('Could not find the plan.', 404);
        return next(error);
    }

    try {
        await plan.remove();
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not delete plan', 500);
        return next(error);
    }


    res.status(200).json({ message: 'Deleted plan' });
}



exports.addPlan = addPlan;
exports.getPlansByUid = getPlansByUid;
exports.updatePlan = updatePlan;
exports.deletePlan = deletePlan;