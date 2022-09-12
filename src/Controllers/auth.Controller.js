import joi from "joi";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import db from '../Database/db.js';

const signupSchema = joi.object({
    name: joi.string().required().min(1),
    email: joi.string().required().email().min(1),
    password: joi.string().required().min(1),
});

const signinSchema = joi.object({
    email: joi.string().required().email().min(1),
    password: joi.string().required().min(1),
});

async function postSignup (req, res) {
    const user = req.body;
    const validation = signupSchema.validate(user);
    if (validation.error){
        res.status(422).send("error");
        return;
    };

    try{
        const users = await db.collection("users").find().toArray();
        const passwordHash = bcrypt.hashSync(user.password, 10);

        for (let i = 0; i < users.length; i++){
            if (user.email === users[i].email){
                return res.status(409).send("email já cadastrado");
            };
        };
        const singup = await db.collection('users').insertOne({...user, password: passwordHash});
        res.status(201).send("ok");
    } catch {
        res.sendStatus(422);
    };
};

async function postSignin (req,res) {
    const {email, password} = req.body;
    const validation = signinSchema.validate({email, password});
    if (validation.error){
        res.status(422).send("error");
        return;
    };

    try{
        const user = await db.collection('users').findOne({email});
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (user && validatePassword){
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            });
            return res.send({token, name: user.name});
        } else {
            return res.sendStatus(422).send("password invalid");
        };
    } catch {
        res.sendStatus(422);
    };
};

export { postSignup, postSignin };