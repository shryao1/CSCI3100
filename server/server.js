const express = require("express");
const path = require("path");

const app = express()

const mongoose = require('mongoose');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json()); // This should be at the top, before defining your routes


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// User Schema
const userSchema = new mongoose.Schema({
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  likePost: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
  dislikePost: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
  favorite: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
  avatar: String,
  introduction: String,
  background_image: String,
  self_post: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Post' }],
  // Add any additional fields as needed
});

const User = mongoose.model('User', userSchema);

// Function to create a new user
async function createUser(userID, password, username) {
  const user = new User({
    userID, // Assuming userID is something like an email or unique identifier
    password,
    username,
    // Initialize other fields as necessary, could be empty arrays or nulls if optional
    followers: [],
    following: [],
    likePost: [],
    dislikePost: [],
    favorite: [],
    avatar: null,
    introduction: null,
    background_image: null,
    self_post: [],
  });

  try {
    const result = await user.save();
    console.log('User created successfully:', result);
  } catch (error) {
    console.error('Error creating the user:', error.message);
  }
}

// Sample data insertion
// Replace 'uniqueUserID', 'securePassword', and 'uniqueUsername' with actual values
// createUser('uniqueUserID@example.com', 'securePassword', 'uniqueUsername');
app.post("/login", async (req, res) => {
  try {
    const { userID, password } = req.body; // Assuming you're receiving userID instead of username
    const userData = await User.findOne({
      userID, // This field name should match the field in your MongoDB collection
      password,
    });

    if (userData) {
      res.status(200).send(userData);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


