const express = require('express')
const app = express()
const port = 3100
var mongoose = require('./db');
var bodyParser = require('body-parser');
var User = require('./models/user.js');
var Course = require('./models/course.js');
var admin = require('./models/admin.js');
var question = require('./models/question.js');
var sizeof = require('object-sizeof')
var result = require('./models/result.js');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get('/', (req, res) => res.send({status:'200',
                                    message:'Quizapp Backend'}))

app.post('/register_user', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
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


app.post('/add_course', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    Course.create(obj).then((doc) => {
        // console.log(doc);
        res.status(200).send({
            data: doc
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.toString()
        });
    })

});
app.post('/add_result', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    result.create(obj).then((doc) => {
        // console.log(doc);
        res.status(200).send({
            message:'score updated succesfully',
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

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
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

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    query={
        roll_num:obj.roll_num
    }
    newdata={
        mark:obj.mark
    }
    if(!obj.mark){
        return res.send(500, {error: "mark field empty"});
    }
    else{
    User.findOneAndUpdate(query, newdata, {upsert: false}, function(err, doc) {
        
        if (sizeof(doc)==0) return res.send(500, {error: err});
        else return res.send('Succesfully saved new mark.'+obj.mark);
    });
}
});
    

app.post('/update_quiz_id', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    query={
        roll_num:obj.roll_num
    }
    newdata={
        mark:obj.quiz_id
    }
    User.findOneAndUpdate(query, newdata, {upsert: true}, function(err, doc) {
        if (sizeof(doc)==0) return res.send(500, {error: err});
        return res.send('Succesfully saved new quiz_id'+obj.mark);
    });
});
    

app.post('/add_question', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    question.create(obj).then((doc) => {
        // console.log(doc);
        res.status(200).send({
            data: doc,
            message:"question addded succesfully"
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.toString()
        });
    })

});

app.post('/getAllQuestions', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    question.find({
        quiz_id: obj.quiz_id
    }, async function (err, questions) {
        
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (sizeof(questions)==0) return res.status(400).send({
            message: 'Invalid quiz id'
        });

        if (questions) {
            var n=0;
            question.find({
                quiz_id: req.body.quiz_id

            }).count(function(err, count){
                
                console.log("Number of questions: ", count );
                res.status(200).send({
                    data: questions,
                    number:count
                });
            }).catch(console.log);

            
        }
    });

});




app.post('/getAllResultsByQuizID', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    result.find({
        quiz_id: obj.quiz_id
    }, async function (err, results) {
        
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (sizeof(results)==0) return res.status(400).send({
            message: 'Invalid quiz id'
        });

        if (results) {
            var n=0;
            result.find({
                quiz_id: req.body.quiz_id

            }).count(function(err, count){
                
                console.log("Number of questions: ", count );
                res.status(200).send({
                    data: results,
                    number:count
                });
            }).catch(console.log);

            
        }
    });

});

app.post('/getAllResultsByRollNum', (req, res) => {

    // console.log(req);
    var obj = req.body;
    // console.log(obj);
    result.find({
        roll_num: obj.roll_num
    }, async function (err, results) {
        
        if (err) return res.status(500).send({
            message: err.toString()
        });
        if (sizeof(results)==0) return res.status(400).send({
            message: 'Invalid quiz id'
        });

        if (results) {
            var n=0;
            result.find({
                roll_num: req.body.roll_num

            }).count(function(err, count){
                
                console.log("Number of questions: ", count );
                res.status(200).send({
                    data: results,
                    number:count
                });
            }).catch(console.log);

            
        }
    });

});


    
    



module.exports=app.listen(port, () => console.log(`QuizApp listening on port ${port}!`))

