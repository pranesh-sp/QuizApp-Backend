const express = require('express')
const app = express()
const port = 3100
var mongoose = require('./db');
var bodyParser = require('body-parser');
var User = require('./models/user.js');
var Course = require('./models/course.js');
var admin = require('./models/admin.js');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Quizapp Backend'))

app.post('/register_user', (req, res) => {

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

app.post('/add_class', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    clas.create(obj).then((doc) => {
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


app.post('/add_course', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    Course.create(obj).then((doc) => {
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
        email: req.body.email
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

app.post('/viewUser', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    User.findOne({
        email: req.body.email
    }, async function (err, user) {
        
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (!user) return res.status(400).send({
            message: 'Invalid Email'
        });

        if (user) {
            res.status(200).send({
                data: user
            });
        }
    });

});


app.post('/update_mark', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    query={
        roll_num:obj.roll_num
    }
    newdata={
        mark:obj.mark
    }
    User.findOneAndUpdate(query, newdata, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved new mark.'+obj.mark);
    });
});
    

app.post('/update_quiz_id', (req, res) => {

    console.log(req);
    var obj = req.body;
    console.log(obj);
    query={
        roll_num:obj.roll_num
    }
    newdata={
        mark:obj.quiz_id
    }
    User.findOneAndUpdate(query, newdata, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved new quiz_id'+obj.mark);
    });
});
    


    
    



app.listen(port, () => console.log(`QuizApp listening on port ${port}!`))