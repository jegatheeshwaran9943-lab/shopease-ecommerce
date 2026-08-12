const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ================= REGISTER =================
exports.register = async (req, res) => {

    const { name, email, phone, password } = req.body;

    // Check empty fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    // Check existing user
    const checkQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(checkQuery, [email], async (err, result) => {

        if (result.length > 0) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const insertQuery =
            'INSERT INTO users(name,email,phone,password) VALUES(?,?,?,?)';

        db.query(
            insertQuery,
            [name, email, phone, hashedPassword],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: 'Registration failed'
                    });
                }

                res.status(201).json({
                    message: 'User registered successfully'
                });

            }
        );

    });

};

// ================= LOGIN =================
exports.login = (req, res) => {

    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, result) => {

        if (result.length === 0) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const user = result[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        console.log("========================");
console.log("LOGIN TOKEN =", token);
console.log("========================");
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    });

};