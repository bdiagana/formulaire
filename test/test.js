process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;

var app = require ("../app");
chai.use(chaiHttp);

describe('Pages requested', function(){
  describe('GET /', function(){
    it('should redirect to /signin', function(done){
      chai.request(app)
      .get('/')
      .end((err,res)=>{
        res.statusCode.should.be.equal(200);
        res.redirects[0].should.include("/signin")
        done();
      })
    });
  });

  describe('GET /signin', function(){
    it('should get signin form', function(done){
      chai.request(app)
      .get('/signin')
      .end((err,res)=>{
        res.statusCode.should.be.equal(200);
        res.redirects.should.be.empty;
        //res.should.not.have
        done();
      });
    });
  });

  describe('GET /signup', function(){
    it('should get signup form', function(done){
      chai.request(app)
      .get('/signup')
      .end((err,res) =>{
        res.statusCode.should.be.equal(200);
        res.redirects.should.be.empty;
        done();
      })
    });
  });
});

describe('POST processes',function(){
  describe('POST /signin', function(){
    it('should connect user', function(done){
      let user = {
        user: "test",
        pass: "test"
      };
      chai.request(app)
      .post('/signin')
      .send(user)
      .end((err,res)=>{
        res.statusCode.should.be.equal(200);
        res.redirects[0].should.include("/offre");
        done();
      });
    });
  });
});
