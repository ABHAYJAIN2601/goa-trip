//Load HTTP module
const express = require('express')
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const app = express();
app.use(bodyParser.json());
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//Create HTTP server and listen on port 3000 for requests

app.post('/createUser',async (req,res)=>{

        // eslint-disable-next-line camelcase
        const { name ,password,age,slot_id,phone_number} = req.body;
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await new User({
        name,
        slot_id,
        phone_number,
        age,
          password: hashPassword,
        }).save();
        
      
    res.send('hello');
});
app.post('/changeSlot',async (req,res)=>{
    const batch = await User.query(function (qb) {
        qb.where('phone_number', req.body.phone_number).update({
         slot_id:req.body.slot_id
        });
      }).fetch();
      res.send('success')
});
//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});