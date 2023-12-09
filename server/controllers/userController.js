import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const signup = async (req, res) => {
    const { rollNumber, username, email, password } = req.body;
    // assign role based on the rool nuber: 
    let role;
    const prefix = rollNumber.substring(0, 2);
    if (prefix === '24') {
        role = 'student';
    } else if (prefix === '25') {
        role = 'staff';
    } else if (prefix === '26') {
        role = 'manager';
    } else {
        return res.status(400).json({ message: "Invalid roll number" });
    }

    try {
        // check if the roll number exists or not
        const existingUser = await User.findOne({ $or: [{ rollNumber }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this roll number or email already exists" });
        }

        // create new user: 
        const result = await User.create({ rollNumber, username, email, password, role });

        // create a token for signup:
        const token = jwt.sign({ rollNumber: result.rollNumber, id: result._id, role: result.role }, process.env.JWT_SECRET, { expiresIn: "12h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
        console.log(error);
    }
};


export const login = async (req, res) => {
    const { rollNumber, password } = req.body;

    try {
        const user = await User.findOne({ rollNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
        res.status(200).json({ result: user, token, message: "Logged in successfully" });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Something went wrong." });
    }
};


// get all the users in db 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


