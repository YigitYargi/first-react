const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const profileimage= multer({ dest: 'profilephotos/' });
const path = require('path');
const fs = require('fs');
const router = express.Router();


const salt = bcrypt.genSaltSync(10);
const secret = 'wertuertu7645mg7d6swwerthms6h5j';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/profilephotos',express.static(__dirname + '/profilephotos'));
app.use('/images', express.static(path.join(__dirname, 'src')));


mongoose.connect('mongodb+srv://yigityargi:ho9NttMFLVKeaLcB@cluster0.9plsv4d.mongodb.net/mern-blog');


app.post('/register', async (req, res) => {
  
  const {email,password,username,city,country,gender} = req.body;
  const defaultProfileImage = '/profilephotos/user.png'; 
  try {
  const userDoc = await User.create({email,password:bcrypt.hashSync(password,salt),username,city,country,gender,
    photo: defaultProfileImage, });

  res.json(userDoc);

  } catch(e){
console.log(e);
    res.status(400).json(e);
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ email, id: userDoc._id, username: userDoc.username,city: userDoc.city,country: userDoc.country,gender: userDoc.gender}, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        email,
        username: userDoc.username, // Include username in the response
        city:userDoc.city,
        country:userDoc.country,
        gender:userDoc.gender,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});


app.get('/profile',(req,res) => {

  const {token} = req.cookies;

  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);

  });
});


app.post('/logout',(req,res) => {
  res.cookie('token','').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async(req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  
 fs.renameSync(path,newPath);
  

 const {token} = req.cookies;
 
 jwt.verify(token, secret, {}, async(err,info) => {
  if (err) throw err;
  
  const{title,summary,content} = req.body;
 const postData = await Post.create({
  title,
  summary,
  content,
  cover:newPath,
  author:info.id,

 });

  res.json(postData);
});
 
 
 
});



app.put('/post', uploadMiddleware.single('file'), async (req,res) => {
  
let newPath = null;

if(req.file) {
  
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
   newPath = path+'.'+ext;
  fs.renameSync(path,newPath);
}

const{token} = req.cookies;

jwt.verify(token, secret, {}, async(err,info) => {
  if (err) throw err;
  
  const{id,title,summary,content} = req.body;
  const postData = await Post.findById(id);
  const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info.id);
  
if(!isAuthor) {

  return res.status(400).json('you are not the author');


}

const updatedPost = await Post.findOneAndUpdate(
  { _id: id },
  {
   title,
   summary,
   content,
   cover: newPath ? newPath : postData.cover,
  },
  { new: true }
  );

  res.json(updatedPost);

});
 

});




app.get('/post', async (req,res) => {
  
  res.json(await Post.find()
  .populate('author',['username'])
  .sort({createdAt: -1})
  .limit(20)
  
  );
  
});




app.get('/post/:id', async (req,res) => {
  
  const{id} = req.params;
 
 const postData = await Post.findById(id).populate('author',['username']);
 res.json(postData); // send data back it to browser
});



app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const postData = await Post.findById(id);
    const isAuthor = JSON.stringify(postData.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json('You are not the author');
    }

   
    await Post.findByIdAndDelete(id);

    
    if (postData.cover) {
      fs.unlinkSync(postData.cover);
    }

    res.json('Post deleted successfully');
  });
});


app.put('/profile', profileimage.single('file'), async (req, res) => {
 
  let newPath = null;

  if(req.file) {
    
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
     newPath = path+'.'+ext;
    fs.renameSync(path,newPath);
  }


  const {email,city, gender, country,photo} = req.body;

  // Update the user's profile
  const updatedProfile = await User.findOneAndUpdate(
    { email : email },
    { city, gender, country,photo},
    { new: true }
  );

  res.json(updatedProfile);

});

app.post('/profile',  profileimage.single('file'),async (req, res) => {
  
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  
 fs.renameSync(path,newPath);
 
 
  try {
  const userDoc = await User.findOneAndUpdate({photo:newPath});

  res.json(userDoc);

  } catch(e){
console.log(e);
    res.status(400).json(e);
  }
});

  


app.listen(4000);