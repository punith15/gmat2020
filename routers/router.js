const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.post("/signup", async(req,res)=>{
    const data = req.body
    console.log(data)
    try {
        const user1 = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })
        const {user, token} = await user1.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
        
    } catch (error) {
        res.status(500).send({error : error.message})
    }
    // console.log(user)
})

router.post("/login", async(req, res)=>{
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        console.log(error.message)
        res.status(404).send({error : error.message})
    }
    
})

module.exports = router;