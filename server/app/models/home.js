
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({	
	_id:{ type: Number, default: 1 },
	answerPairs:[{
		key:String,
		value:String
	}],
	wife:{
		name:String,
		age:Number,
		images:[{
			url:String
		}]
	},
	children:[
		{
			name:String,
			age:Number,
			images:[{
				url:String
			}]
		}
	],
	grandchildren:[{
		name:String,
		age:Number,
		images:[{
			url:String
		}]
	}
	]
	/*name: String,
	mail: String,
	password: String,
	status: String,
	created_date: Date,
	updated_date: Date,
	active_hash: String,
	role_id: { type: Number, default: 2 }*/
});



//methods ======================
//generating a hash
/*userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};
*/
//create the model for users and expose it to our app
Users = mongoose.model('users', userSchema);
module.exports = Users;