const express = require('express')
const app = express()
const port = 3100
var mongoose = require('./db');
var bodyParser = require('body-parser');
var User = require('./models/user.js');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Quizapp Backend'))

app.post('/register', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    User.create(obj).then((doc) => {
        console.log(doc);
        res.status(200).send({
            data: doc
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.toString()
        });
    })

});

app.post('/login', function (req, res) {

    User.findOne({
        roll_num: req.body.roll_num
    }, async function (err, doc) {
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (!doc) return res.status(400).send({
            message: 'Invalid Credentials'
        });

        if (doc.password === req.body.password)
            var passwordIsValid = true;
        if (!passwordIsValid) return res.status(400).send({
            auth: false,
            
            message: 'Invalid Credentials'
        });

      

        res.status(200).send({
            auth: true,
            name: doc.name
        });
    });

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))