
require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app= express();
const port=process.env.PORT;
const database=require('./database');
const userController=require('./controllers/userController');
// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user',userController);
//default  routes
app.all('/',(req,res) => {
    return  res.json({"status":true,message:"from index"});
})
// start server 
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});