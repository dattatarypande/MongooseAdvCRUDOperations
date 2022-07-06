// int
const router = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("./../models/user");

// middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// router
router.all("/", (req, res) => {
  return res.json({
    satus: true,
    message: "user controller msg",
  });
});

// create new user router
router.post(
  "/createnew",
  [
  //cheack not empty
    check("username").not().isEmpty().trim().escape(),
    check("password").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: "From validation error",
        errors: errors.array(),
      });
    }
    const hasedpasswords = bcrypt.hashSync(req.body.password, 10);

    var temp = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedpasswords,
    });
    // insert data into database
    temp.save((err, result) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "DB insert fail..",
          error: err,
        });
      }
      return res.status(200).json({
        status: true,
        message: "DB new inserted..",
        result: result,
      });
    });

    // User.create({  // using create
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:hasedpasswords
    // },(err,result) => {
    //     // check errors
    //     if(err){
    //         return res.status(500).json({
    //             status:false,
    //             message:'db insert failed..',
    //             error:err
    //         });
    //     }
    //     return res.json({
    //         status:true,
    //         message:'success',
    //         result:result
    //     })
    // });
    // return  res.json({
    //   status: true,
    //   message:'saved data',
    //   data:req.body,
    //   hasedpassword:hasedpasswords
    // });
  }
);
router.get('/find',(req,res)=>{
    User.find((err,result)=>{
        if(err){
            return res.json({
                status: false,
                message: "DB find failed",
                error: err,
              });
        }
        // if ok
        return res.status(200).json({
            status: true,
            message: "DB find success..",
            result: result
          });
    })
})
//find with email 
router.get('/find/:email',(req,res)=>{
    User.find({email:req.params.email},(err,result)=>{
        if(err){
            return res.json({
                status: false,
                message: "DB find failed",
                error: err,
              });
        }
        // if ok
        return res.status(200).json({
            status: true,
            message: "DB find success..",
            result: result
          });
    })
})

// Update
router.put('/update/:email',(req,res)=>{
    
    User.updateOne({email:req.params.email},{username:req.body.username},(err,result)=>{
        if(err){
            return res.json({
                status: false,
                message: "DB update failed",
                error: err,
              });
        }
        // if ok
        return res.status(200).json({
            status: true,
            message: "DB update success..",
            result: result
          });
    })
})

// delete 
router.delete('/delete/:email',(req,res)=>{
    if(req.params.email){
    User.remove({email:req.params.email},(err,result)=>{
        if(err){
            return res.json({
                status: false,
                message: "DB delte failed",
                error: err,
              });
        }
        // if ok
        return res.status(200).json({
            status: true,
            message: "DB delete success..",
            result: result
          });
    })}
    else{
        return res.json({
            status: false,
            message: "provide email",
            
          });
    }
})
// modules export

module.exports = router;
