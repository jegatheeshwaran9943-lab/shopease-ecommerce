const db = require("../config/db");


// Get User Profile
exports.getProfile = (req, res) => {

    const userId = req.user.id;


    const sql = `
        SELECT id, name, email, phone, role, created_at 
        FROM users 
        WHERE id = ?
    `;


    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err
            });
        }


        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json({
            user: result[0]
        });

    });

};



// Update User Profile
exports.updateProfile = (req, res) => {


    const userId = req.user.id;


    const {
        name,
        phone
    } = req.body;



    const sql = `
        UPDATE users 
        SET name = ?, phone = ?
        WHERE id = ?
    `;



    db.query(
        sql,
        [name, phone, userId],
        (err, result) => {


            if (err) {
                return res.status(500).json({
                    error: err
                });
            }


            res.json({
                message: "Profile updated successfully"
            });


        }
    );


};