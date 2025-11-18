// create a new router
const express = require("express");
const router = express.Router();

// include bcrypt
const bcrypt = require('bcrypt');

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
});

router.post('/registered', function (req, res, next) {
    // saving data in database
    const saltRounds = 10;
    const plainPassword = req.body.password;

    // bcrypt.hash() is an async func - so db.queury must be run inside it to store the hashed password
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { 
        // Store hashed password in your database.
        if(err) {
            next(err);
        }

        const sqlQuery = 'INSERT INTO users (hashed_password) VALUES (?)';
        const newRecord = [hashedPassword];

        db.query(sqlQuery, newRecord, (err, result) => {
            if (err) {
            next(err)
        } else {
            result = `hello ${req.body.first} ${req.body.last} you are now registered! we will send you an email at ${req.body.email}. 
            your password is: ${req.body.password}, your hashed password is: ${hashedPassword}.`;

            res.send(result);
        }
    });  
    });                                                                
}); 

// export the router object so index.js can access it
module.exports = router;
