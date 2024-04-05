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
mongoose.connect('mongodb://127.0.0.1:27017', {
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
  avatar: Buffer,
  introduction: String,
  background_image: Buffer,
  newNotification: Boolean,
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
    newNotification: false,
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
createUser('123', 'securePassword', 'uniqueUsername');
createUser('8', '3100', 'winnie');
createUser('100', '123', 'test');
createUser('0', 'admin', 'admin');
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

// Generate Unique UserID
const generateUniqueUserID = async () => {
	var userID;
	var isUnique = false;

	while (!isUnique) {
	userID = Math.floor(1000 + Math.random() * 9000).toString();
	const existingUser = await User.findOne({ userID });
		if (!existingUser) isUnique = true;
	}

	return userID;
};

// Registration Endpoint
app.post('/register', async (req, res) => {
	try {
		const { user_name, user_password } = req.body;
		const userID = await generateUniqueUserID();

		createUser(userID, user_password, user_name);

		// Check if newUser actually has a userID property

		res.status(201).json({ message: "User registered successfully", userId: userID });
	} catch (error) {
		console.error('Error during registration:', error);
		res.status(500).json({ message: "An error occurred during registration" });
	}
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


