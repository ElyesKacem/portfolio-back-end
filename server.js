require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require("mongoose");
const app = express();
const connectDB = require('./config/dbConnection');
const verifyJWT = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 3500;

connectDB();


// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}));


app.use('/post',require('./routes/api/post'));
app.use('/user',require('./routes/api/user'));

app.use(verifyJWT);

app.use('/test',function(req,res){
  console.log('test is verified');
  return res.json({'message':'test is verified dude,'})
})


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});