const assert = require('assert');
const chai = require('chai')
const expect = require('chai').expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const request = require('supertest');
const app = require('../server');
let should = chai.should();

describe('/POST ', () => {
    it('it should return success message after posting', (done) => {
       

        ques= {
            quiz_id :"2",
            question :"what is potato?",
            option_1:"best thing?",
            option_2:"best thing?",
            option_3:"best thing?",
            option_4:"best thing?",
            answer:"1"
            
        }
      chai.request(app)
          .post('/add_question')
          .send(ques)
          .end((err, res) => {
                // res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message')
                
            done();
          });
    });

});







