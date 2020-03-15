const assert = require('assert');
const chai = require('chai')
const expect = require('chai').expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const request = require('supertest');
const app = require('../server');
let should = chai.should();

describe('/POST addQuestion ', () => {
    it('it should return success message after posting', (done) => {
       

        ques= {
            quiz_id :"2",
            question :"what is potato?",
            option_1:"best thing?",
            option_2:"best thing?",
            option_3:"best thing?",
            option_4:"best thing?",
            answer:"1",
            
        }
      chai.request(app)
          .post('/add_question')
          .send(ques)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message')
                
            done();
          });
          
    });



});



describe('/POST getAllQuestions  ', () => {
    it('should return error when invalid quiz id is passed', (done) => {
       

        qid= {
            quiz_id :"4",
         
            
        }
      chai.request(app)
          .post('/getAllQuestions')
          .send(qid)
          .end((err, res) => {
                res.should.have.status(400);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message')
                
            done();
          });
          
    });



});



describe('/POST add_course ', () => {
    it('should return error when empty data is passed', (done) => {
       

        qid= {}

      chai.request(app)
          .post('/add_course')
          .send(qid)
          .end((err, res) => {
                res.should.have.status(500);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message')
                
            done();
          });
          
    });



});

describe('/POST update_quiz_id ', () => {
    it('should return error when invald roll_num is passed', (done) => {
       

        qid= {roll_num:"abc"}

      chai.request(app)
          .post('/update_quiz_id')
          .send(qid)
          .end((err, res) => {
                res.should.have.status(500);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message')
                
            done();
          });
          
    });



});


describe('/POST update_mark ', () => {
    it('should return error when empty mark field is passed', (done) => {
       

        qid= {roll_num:"abc",
                }

      chai.request(app)
          .post('/update_mark')
          .send(qid)
          .end((err, res) => {
                res.should.have.status(500);
                // res.body.should.be.a('object');
                // res.body.should.have.property('message')
                
            done();
          });
          
    });



});





// we are recording CI Video
