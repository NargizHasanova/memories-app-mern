import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
    const { email, password } = req.body
    console.log(email);
    try {
        const existingUser = await UserModal.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: 'user does not exist',
            });
        }

        const isValidPass = await bcrypt.compare(password, existingUser.password);
        console.log(isValidPass);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'wrong password',
            });
        }

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            secret,
            {
                expiresIn: '30d',
            },
        );


        res.status(200).json({ ...existingUser._doc, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err.message);
    }

}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    try {
        const existingUser = await UserModal.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'user already exists' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'passwords do not match' });

        const hashedPassowrd = await bcrypt.hash(password, 12);

        const createdUser = await UserModal.create({
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassowrd
        });

        const token = jwt.sign(
            {
                email: createdUser.email,
                id: createdUser._id,
            },
            secret,
            { expiresIn: '30d' },
        );

        res.status(201).json({ ...createdUser._doc, token }) // bunuda front localstorage-da stringify edir
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}




