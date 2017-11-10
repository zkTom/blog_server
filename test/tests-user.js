var http = require('http')
var rest = require('restler')
var chai = require("chai"),
    should = chai.should,
    assert = chai.assert,
    app = require('./app.js');
    base ="127.0.0.1:3001";
// describe 是一个一般的测试套件（suites）里面可以有具体的测试用例（it)也可以把汗测试套件（suites)
// describe('user tests',function(){ // 一般的
// 	it('Spec description',function(){});
	
// })
describe('should be able to add a user', function(){
		
	var user = {
		name:'tzk123',
		password:'123456',
		create_time:new Date()
	}
    // it('#test GET /path?name=Bob', async () => {
    //     let res = await request(server)
    //         .get('/path?name=Bob')
    //         .expect('Content-Type', /text\/html/)
    //         .expect(200, '<h1>Hello, Bob!</h1>');
    // });

	it('normal pass',  function(done) {
		rest.postJson(base+'/register',user).on('complete', function(data, response) {
			 if (response.statusCode == 200) {
			 	console.log(data)
				done()
  			}
		})	
    })
	
})