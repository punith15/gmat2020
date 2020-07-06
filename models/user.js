const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "email must be unique"],
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid !!!")
            }
            if(User.findOne({email : value})){
                throw new Error("Email already exists !!!")
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 6
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},{
    timestamps : true
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    return {user, token};
}

userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified("password")){
        const password = await bcrypt.hash(user.password, 8);
        user.password = password
    }

    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User;