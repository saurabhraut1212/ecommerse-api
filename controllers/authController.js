import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/User.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User with that email is already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword, role);
        res.json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

};

