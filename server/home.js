/*var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');*/
var dateFormat = require('dateformat');
var mongoose = require('mongoose');
/*var configDB = require('../../config/database.js');
mongoose.connect(configDB.url);*/
var users = require('../models/home.js');
var reminders = require('../models/reminder.js');
var cors = require('cors');
var util = require('util');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var knowledgeBaseId = 'a35153a8-ccab-46c6-b2ef-b0a5e1da8915';
var subsriptionKey = 'a2ea2916d854479dabf9ea302e61a415';
var httpsRequest = require('request');
var utf8 = require('utf8');
var exec = require('child_process').exec, child;

//socket setup to handle mqtt requests
var sock;
var mq;
var path      = require('path');
var conf      = require(path.join(__dirname, 'config'));
var internals = require(path.join(__dirname, 'internals'));
setupSocket();

var information;

var wife = {
	name : 'lily',
	age:60,
	images:[{
		url:'https://s3.amazonaws.com/images-hacktech/with+wife.jpg'
	},{
		url:'https://s3.amazonaws.com/images-hacktech/wedding.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2746082005_9e764550cd_z.jpg'
	}]
}

var children = [{
	name:'lucy',
	age:31,
	images:[{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2746457240_4a97bbe57b_z.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2746896162_f15ba8c0f5_z.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2747039690_3ebb196bd3_z.jpg'
	}]
}]

var grandChildren = [{
	name:'Katy',
	age:4,
	images:[{
		url:'https://s3.amazonaws.com/images-hacktech/grandkids.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2640075068_415341224d_z.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2746863250_432545a1d5_z.jpg'
	}
	]
},{
	name:'Jane',
	age:5,
	images:[{
		url:'https://s3.amazonaws.com/images-hacktech/grandkids.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2640075068_415341224d_z.jpg'
	},{
		url:'https://s3.amazonaws.com/images-caltech-hacks/2746863250_432545a1d5_z.jpg'
	}
	]
}]


//create default db entries
var answerKeyValuePair = {
	'1'	: 'Name',
	'2'	: 'Age',
	'3'	: 'Exact location',
	'4'	: 'hobby',
	'5'	: 'pet',
	'6' : 'pet name',
    '7'	: 'Favorite national sports team',
	'8'	:'favorite musician/band',
	'9'	:'favorite music genre',
	'10':	'Wife/spouse name',
	'11':	'a country/city you have travelled to',
	'12':'a list of films you love',
	'13':	'favorite food/dish',
	'14': 'Company/business you worked for previously',
	'15': 'Your title at your previous job',
	'16':	'<<wife>> Loading an image of your spouse',
	'17':  '<<DaughterContact>>',	
	'18':	'A tv show that they like',
	'27':'<<makes phone call to emergency contact>>',
	'30': 'Child name',
	'31':'Aniversary date',
	'32':'number of children',
	'33':'Daughter home city',
	'34':'Daughter age',
	'35':'<<daughter>>',
	'36':'<<family>>',
	'37':'<<grandChildren>>'
}

var userKeyValuePair = [{
	key:'Name',
	value:'James Wilson'
},
{
	key:'Age',
	value:'63'
},{
	key:'Exact location',
	value:'3800 SW 34th Street, Baker Avenue'
},{
	key:'hobby',
	value:'basketball, football, gardening'
},{
	key:'pet',
	value:'dog'
},{
	key:'pet name',
	value:'Hugo'
},{
	key:'Favourite national sports team',
	value:'Nicks'
},{
	key:'favorite musician/band',
	value:'U 2, procralimers, creed, def leppard, metallica'
},{
	key:'favorite music genre',
	value:'electronic'
},{
	key:'Wife/spouse name',
	value:'lily'
},{
	key:'a country/city you have travelled to',
	value:'canada, mexico, united kingdom, india'
},{
	key: 'favourite movies',
	value: 'james bond, seven, godfather, shawshank redemption'
},{
	key: 'favorite food/dish',
	value:'orange chicken, chicken qusedillas, takoyaki'
},{
	key: 'Company/business you worked for previously',
	value:'IBM, Apple, Ford'
},{
	key: 'Your title at your previous job',
	value:'Chief Executive Sales at IBM'
},{
	key: '<<wife>> Loading an image of your spouse',
	value:'##https://s3.amazonaws.com/images-hacktech/with+wife.jpg##'
},{
	key: '<<makes phone call to emergency contact>>',
	value:'<<3528881397>>',
},{
	key:'<<DaughterContact>>',
	value:'<<3528701229>>'
},{
	key: 'A tv show that they like',
	value:'cheers, perfect strangers,knight rider, who\'s the boss'
},{
	key:'Child name',
	value:'lucy',
},{
	key:'Aniversary date',
	value:'March, 25',
},{
	key:'number of children',
	value:'1',
},{
	key:'Daughter home city',
	value:'Gainesville',
},{
	key:'Daughter age',
	value:'31'
},{
	key:'<<daughter>>',
	value:'##https://s3.amazonaws.com/images-caltech-hacks/2746457240_4a97bbe57b_z.jpg##'
},{
	key:'<<family>>',
	value:'##https://s3.amazonaws.com/images-caltech-hacks/2746896162_f15ba8c0f5_z.jpg##'
},{
	key:'<<grandChildren>>',
	value:'##https://s3.amazonaws.com/images-caltech-hacks/2747400516_45170dcfc6_z.jpg##'
}]


// var allUsers = users.find();
// for(var u in allUsers){
// 	u.answerPairs = userKeyValuePair;
// 	users.update({'id':u.id},{'$set':{'answerPairs':userKeyValuePair,'wife':wife,'children':children,'grandChildren':grandChildren}}, 
// 		function(err){console.log('error ' + err)});
// }

//for testing purposes only
// insertReminder = function(){
// 	var date = new Date();
// 	var reminder = new reminders({
//     "description" : "hi",
//     "time" : new Date(date.getTime() + 5*60*1000),
//     "reminded" : false
// 	});
// 	reminder.save(function(err){
// 	});
// }
// insertReminder();

//function that queries database for reminders and relays message.
checkReminders = function(){
	console.log('checking reminders');

	var fs = require('fs');
	if (fs.existsSync("../pushNotifications/notifications.txt")) {
    	fs.appendFile("../pushNotifications/notifications.txt", "\nHey there", function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The text was appended to the file");
		}); 
	}else{
		fs.writeFile("../pushNotifications/notifications.txt", "who am i", function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was created");
		});
	}
	

	/*exec('/home/karanvasnani/Desktop/AlzCare/pushNotifications/./a.sh \"' + "hello" + '\"', 
			function(error, stdout, stderr){
				console.log('stdout: ' + stdout);
        		console.log('stderr: ' + stderr);
        		if (error !== null) {
             	console.log('exec error: ' + error);
        		}
	});*/



	var date = new Date();
	var futureDate = new Date(date.getTime() + 5*60*1000);
	var reminderQuery = reminders.find({'time': {
		$gt: date,
		$lte: futureDate
	}, 'reminded': false});

	reminderQuery.exec(function(err, response){
		var reminderList = JSON.parse(JSON.stringify(response));
		for(var index in reminderList){
			var reminder = reminderList[index];

			//SECTION
			//this is where the script is called, change the arguments accordingly. 
			
			exec('../pushNotifications/./alexa.sh \"' + reminder.description + '\"', 
			function(error, stdout, stderr){
				console.log('stdout: ' + stdout);
        		console.log('stderr: ' + stderr);
        		if (error !== null) {
             	console.log('exec error: ' + error);
        		}
			});
			//child();

			//update reminded to true
			reminders.update({'_id': reminder._id}, {'$set': {'reminded': true}}, function(err, data){
				if(err){
					console.log('error updating reminders');
				}
			});
		}
	});
	
}
//call this function upon init.
checkReminders();
//call this function every minute.
//setInterval(checkReminders, 5*1000);

exports.setReminder = function(req, res){
	var data = req.body;
	var reminder = new reminders({
		"description": data.description,
		"time": data.date,
		"reminded": false
	});
	reminder.save(function(err){
		if(err){
			res.send(err);
		}
		res.send(200);
	});
}

exports.handleSOS = function(req, res){
	//do stuff here
}

exports.storeData = function(req, res){
	var inputData = JSON.parse(req.body);
	var id = req.params.id;
	for(var key in inputData){
		users.update({'id': id, 'answerPairs.key':key}, {'$set': {
		    'answerPairs.$.value': inputData[key]
		}},function(err){
			console.log(err);
		});
	}
	res.send(200);
}

exports.storeImage = function(req, res){
	var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    form.on('file', function(name,file) {
        console.log(name);
        var formData = {
	      file: {
	        value:  fs.createReadStream(file.path),
	        options: {
	          filename: file.originalFilename
	        }
	      }
	    };

	    // Post the file to the upload server
	    request.post({url: 'http://localhost:8042/upload', formData: formData});
    });
}

//intput
/*
{
	"question":"who am I?"
}
*/
function checkAndHandleConjugate(req,res){
	var innerAnswer = req.body;
	 if(innerAnswer.split("and")[1] != undefined || innerAnswer.split("And")[1] != undefined  || innerAnswer.split(".")[1] != undefined){
	    	if(innerAnswer.split("and")[1] == undefined){
	    		if(innerAnswer.split("And")[1] == undefined){
    				conjugateData = innerAnswer.split(".")[0];
    				var options =  createOptions(req,res);
    				var response = getIntermediateResponse(req,res);    				
	    		}else{
	    			conjugateData = innerAnswer.split("And")[0];
	    		}
	    	}else{
	    		conjugateData = innerAnswer.split("and")[0];
	    	}
	    }
}

function createOptions(req,res){
	var options = {
	  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
		  	method: 'POST',
		  	headers: {
		      'Content-Type': 'application/json',
		      'Ocp-Apim-Subscription-Key':subsriptionKey
		  	},
		  	body: JSON.stringify(req.body)
		};

		return options;
}

function getIntermediateResponse(req, res){
	httpsRequest(options, function callback(error, response, body) {
			  if (!error && response.statusCode == 200) {
			    var info = JSON.parse(body);

			    var answer = info.answer;
			    var options = {
			  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
				  	method: 'POST',
				  	headers: {
				      'Content-Type': 'application/json',
				      'Ocp-Apim-Subscription-Key':subsriptionKey
				  	},
				  	body: JSON.stringify({question: answer})
				};
				httpsRequest(options, function callback(error, response, body) {
				  if (!error && response.statusCode == 200) {
				    var innerInfo = JSON.parse(body);
				    console.log(innerInfo);
				    var innerAnswer = innerInfo.answer;
				    var splitAnswer = innerAnswer.split("@");
				    //console.log(splitAnswer.length);
				    if(splitAnswer.length==1){
				    	output = answer;
				    }else{
				    	output = "";
				    	for(var x in splitAnswer){
				    		if(answerKeyValuePair[splitAnswer[x]]==undefined){
				    			output=output+splitAnswer[x]+" ";
				    		}else{
					    			var currentAnswer;
					    			for(var y in userKeyValuePair){
					    				if(userKeyValuePair[y].key==answerKeyValuePair[splitAnswer[x]]){
					    					currentAnswer=userKeyValuePair[y].value;
					    					break;
					    				}
					    			}
					    			output=output+currentAnswer+" ";
				    			
				    		}
				    	}

				    }
					    
					    output = utf8.encode(output);
					}else{
						res.send(error);
					}

				});
				
			 }else{
			 	res.send(error);
			 }
		});
	return output;
}

exports.sendQuestion = function(req, res){
	console.log("inside sendquestion");
	console.log(JSON.stringify(req.body));
	users.findById(req.params.id,function(err,user){
		var commonAnswer = 'Sorry I do not have an answer for that.I am still learning about you, ask me anything else about yourself.';
		var output;
	    //checkAndHandleConjugate(req,res);
		//var options = createOptions(req,res);
		var options = {
	  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
		  	method: 'POST',
		  	headers: {
		      'Content-Type': 'application/json',
		      'Ocp-Apim-Subscription-Key':subsriptionKey
		  	},
		  	body: JSON.stringify(req.body)
		};
		console.log('before 1st qna:'+new Date());
		httpsRequest(options, function callback(error, response, body) {
			  console.log('before 1st qna:'+ JSON.stringify(response));
			  var info = JSON.parse(response.body);
			 
			  if (!error && response.statusCode == 200) {
			  	 console.log('after 1st qna:'+JSON.stringify(info));
			    
			    if(info.score==0){
			    	res.status(200).json({answer:commonAnswer});
			    	return;
			    }
			    var answer = info.answer;
			    var options = {
			  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
				  	method: 'POST',
				  	headers: {
				      'Content-Type': 'application/json',
				      'Ocp-Apim-Subscription-Key':subsriptionKey
				  	},
				  	body: JSON.stringify({question: answer})
				};
				console.log('before second qna:'+new Date());
				httpsRequest(options, function callback(error, response, body) {
					  if (!error && response.statusCode == 200) {
					  	console.log('after second qna:'+new Date());
					    var innerInfo = JSON.parse(body);
					    console.log(innerInfo);
					    if(innerInfo.score==0){
					    	res.status(200).json({answer:commonAnswer});
					    	return;
					    }
					    var innerAnswer = innerInfo.answer;
					    var splitAnswer = innerAnswer.split("@");
					    //console.log(splitAnswer.length);
					    if(splitAnswer.length==1){
					    	output = innerAnswer;
					    }else{
					    	output = "";
					    	for(var x in splitAnswer){
					    		if(answerKeyValuePair[splitAnswer[x]]==undefined){
					    			output=output+splitAnswer[x]+" ";
					    		}else{
						    			var currentAnswer;
						    			for(var y in userKeyValuePair){
						    				if(userKeyValuePair[y].key==answerKeyValuePair[splitAnswer[x]]){
						    					currentAnswer=userKeyValuePair[y].value;
						    					break;
						    				}
						    			}
						    			output=output+currentAnswer+" ";
					    			
					    		}
					    	}

					    }
					    
					    //output = utf8.encode(output);
					    //console.log(JSON.stringify(output));
			    		res.status(200).json({answer:output});
					}else{
						res.send(error);
					}

				});
				
			 }else{
			 	res.send(error);
			 }
		});
	});
}

exports.getAnswers = function(req, res){
	console.log("inside answers");
	var str = req.url.split('?')[1].split('=')[1];
	var input = str.replace(/%20/g, " ");
	console.log(input);
	users.findById(req.params.id,function(err,user){
		var commonAnswer = 'Sorry I do not have an answer for that.I am still learning about you, ask me anything else about yourself.';
		var output;
	    //checkAndHandleConjugate(req,res);
		//var options = createOptions(req,res);
		var options = {
	  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
		  	method: 'POST',
		  	headers: {
		      'Content-Type': 'application/json',
		      'Ocp-Apim-Subscription-Key':subsriptionKey
		  	},
		  	body: JSON.stringify({question: input})
		};
		console.log('before 1st qna:'+new Date());
		httpsRequest(options, function callback(error, response, body) {
			  console.log('before 1st qna:'+ JSON.stringify(response));
			  var info = JSON.parse(response.body);
			  //var info = question;
			 
			  if (!error && response.statusCode == 200) {
			  	 //console.log('after 1st qna:'+JSON.stringify(info));
			    
			    /*if(info.score==0){
			    	res.status(200).json({answer:commonAnswer});
			    	return;
			    }*/
			    var answer = info.answer;
			    //var answer = input;
			    var options = {
			  		url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/'+knowledgeBaseId+'/generateAnswer',
				  	method: 'POST',
				  	headers: {
				      'Content-Type': 'application/json',
				      'Ocp-Apim-Subscription-Key':subsriptionKey
				  	},
				  	body: JSON.stringify({question: answer})
				};
				console.log('before second qna:'+new Date());
				httpsRequest(options, function callback(error, response, body) {
					  if (!error && response.statusCode == 200) {
					  	console.log('after second qna:'+new Date());
					    var innerInfo = JSON.parse(body);
					    console.log(innerInfo);
					    if(innerInfo.score==0){
					    	res.status(200).json({answer:commonAnswer});
					    	return;
					    }
					    var innerAnswer = innerInfo.answer;
					    var splitAnswer = innerAnswer.split("@");
					    //console.log(splitAnswer.length);
					    if(splitAnswer.length==1){
					    	output = innerAnswer;
					    }else{
					    	output = "";
					    	for(var x in splitAnswer){
					    		if(answerKeyValuePair[splitAnswer[x]]==undefined){
					    			output=output+splitAnswer[x]+" ";
					    		}else{
						    			var currentAnswer;
						    			for(var y in userKeyValuePair){
						    				if(userKeyValuePair[y].key==answerKeyValuePair[splitAnswer[x]]){
						    					currentAnswer=userKeyValuePair[y].value;
						    					break;
						    				}
						    			}
						    			output=output+currentAnswer+" ";
					    			
					    		}
					    	}

					    }
					    
					    //output = utf8.encode(output);
					    //console.log(JSON.stringify(output));
					    console.log(output);
			    		res.status(200).json({answer:output});
					}else{
						res.send(error);
					}

				});
				
			 }else{
			 	res.send(error);
			 }
		});
	});
}

exports.getStory = function(req, res){
	res.status(200).json(userKeyValuePair);
}

exports.storeInfo = function(req, res){
	console.log(req.body);
	information = req.body;

	res.send(200);
}

exports.getInfo = function(req, res){
	information = "HI";
	console.log(req.url.split('?')[1].split('=')[1]);
	var str = req.url.split('?')[1].split('=')[1];
	var replaced = str.replace("%20", " ");
	console.log(replaced);

	if(information==undefined){
		res.status(204).send();
	}else{
		res.status(200).json({info: information});
	}
}




// -- Socket Handler
// Here is where you should handle socket/mqtt events
// The mqtt object should allow you to interface with the MQTT broker through 
// events. Refer to the documentation for more info 
// -> https://github.com/mcollina/mosca/wiki/Mosca-basic-usage
// ----------------------------------------------------------------------------

function socket_handler(socket, mqtt) {
	console.log("mqtt handler");
	// Called when a client connects

	// Prepare to keep track of all connected users and sockets
	sock = socket;
 	mq = mqtt;
	mqtt.on('clientConnected', client => {
		socket.emit('debug', {
			type: 'CLIENT', msg: 'New client connected: ' + client.id
		});
	});

	// Called when a client disconnects
	mqtt.on('clientDisconnected', client => {
		socket.emit('debug', {
			type: 'CLIENT', msg: 'Client "' + client.id + '" has disconnected'
		});
	});

	// Called when a client publishes data
	mqtt.on('published', (data, client) => {
		if (!client) return;
		console.log(data.topic);

		if(data.topic == "reset_sos"){
			console.log("reset_sos button is pressed");
			/*capacityCounter1++;
			if(threshold < capacityCounter1){
				var message = {
					topic: 'ledOn1',
					payload : 'red',
					qos:0,
					retain: false
				};
			
				mq.publish(message,function(){
					console.log("led on from counter1");
				})

				socket.emit('debug1', {
				type: 'PUBLISH', 
				msg: 'Client "' + client.id + '" published "' + JSON.stringify(data) + '"'
			});
			}*/
			
		}

		else if(data.topic == "sos"){
			console.log("sos button is pressed");
			/*capacityCounter2++;
			if(threshold < capacityCounter2){
				var message = {
					topic: 'ledOn2',
					payload : 'red',
					qos:0,
					retain: false
				};
			
				mq.publish(message,function(){
					console.log("led on from counter2");
				})
				socket.emit('debug2', {
				type: 'PUBLISH', 
				msg: 'Client "' + client.id + '" published "' + JSON.stringify(data) + '"'
			});
			}*/
			
		}
	});

	// Called when a client subscribes
	mqtt.on('subscribed', (topic, client) => {
		if (!client) return;

		socket.emit('debug', {
			type: 'SUBSCRIBE',
			msg: 'Client "' + client.id + '" subscribed to "' + topic + '"'
		});
	});

	// Called when a client unsubscribes
	mqtt.on('unsubscribed', (topic, client) => {
		if (!client) return;

		socket.emit('debug', {
			type: 'SUBSCRIBE',
			msg: 'Client "' + client.id + '" unsubscribed from "' + topic + '"'
		});
	});
}

function setupSocket() {
	var server = require('http').createServer(app);
	var io = sockets(server);
	console.log("setup socket");

	// Setup the internals
	internals.start(mqtt => {
		console.log("in internals");
		io.on('connection', socket => {
			console.log("calling shandler");
			socket_handler(socket, mqtt)
			
		});
	});

	server.listen(conf.PORT, conf.HOST, () => { 
		console.log("Listening on: " + conf.HOST + ":" + conf.PORT);
	});
}