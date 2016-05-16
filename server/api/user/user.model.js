var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  name: String,
  phone: String,
  picture: String,
  car: { make: String, model: String, year: String},
  availability: Boolean,
  facebook: String,
  google: String,
  twitter: String,
  providers: [],
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
