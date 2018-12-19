const mongoose = require('mongoose');
const { hashingPassword } = require('../helpers/encrypt.js');

const Schema = mongoose.Schema;

userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'harus diisi'],
    },
    popularity: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        // unique: true,
        required: [true, 'harus diisi'],
        validate: {
            validator: function(email) {
                return new Promise(function(resolve, reject) {
                    User.find({
                        email: email,
                    }, function(err, dataUser) {
                        if (dataUser.length > 0) {
                            resolve(false); // mongoose anggap callback false sama dengan throw error...
                        } else {
                            resolve(true); // semacam panggil next..
                        }
                    })
                });
            },
            message: 'already exist',
        },
    },
    password: {
        type: String,
        required: [true, 'harus diisi']
    },
    image: {
        type: String,
        default: '',
    },
    subscribe: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
    subscriber: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: [],
    },
});

userSchema.pre('save', function(next) {
    this.password = hashingPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;