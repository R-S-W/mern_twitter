const express = require("express");
const mongoose = require('mongoose');
const app  = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const User = require('./models/User');

const passport = require('passport')

mongoose 
  .connect(db, {useNewUrlParser: true})
  .then(()=> console.log('Connected to MongoDB successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({//app responds to other software like postman
  extended: false
}));
app.use(bodyParser.json());// respond to json requests

app.use(passport.initialize());

require('./config/passport')(passport);


// app.get("/", (req, res) => {
//   const user = new User({
//     handle: 'jim',
//     email: 'jim@jim.jim',
//     password: 'jimisgreat123'
//   })
//   user.save();
//   res.send("Hello World!!!");
// });


app.use("/api/users", users);
app.use('/api/tweets', tweets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port  = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));