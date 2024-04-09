const express = require("express");
const path = require("path");
const fs = require('fs')
const app = express()

const mongoose = require('mongoose');

const cors=require("cors");
const { log } = require("console");
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
  followers: [{ type: String, ref: 'User' }],
  following: [{ type: String, ref: 'User' }],
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  likePost: [{ type: String, ref: 'Post' }],
  dislikePost: [{ type: String, ref: 'Post' }],
  favorite: [{ type: String, ref: 'Post' }],
  avatar: Buffer,
  introduction: String,
  background_image: Buffer,
  newNotification: Boolean,
  //self_post: [{ type: String, ref: 'Post' }],
  // Add any additional fields as needed
});

const User = mongoose.model('User', userSchema);


const attachmentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  }
});


const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;

const createAttachmentFromFile = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return {
    filename: path.basename(filePath),
    contentType: 'image/jpeg', // Or use a library like 'mime-types' to get the correct MIME type from the file
    data: fileData
  };
};

const attachment = createAttachmentFromFile("./hahaha.jpeg");


const postSchema = new mongoose.Schema({
  postID: { type: Number, required: true, unique: true },
  tag: Number, // If multiple, can be an array of strings
  content: { type: String, required: true },
  attachment: attachmentSchema,
  userID: { type: String, ref: 'User', required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  visible: { type: Number, enum: [-1, 0, 1], default: 0 }
  // Additional fields and references to other schemas can be added as needed
  // Add automatic timestamp for post creation
}, { timestamps: { createdAt: 'post_time' } });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


const generateUniquePostID = async () => {
  try {
    // Find the maximum postID in the database
    const maxPost = await Post.findOne().sort({ postID: -1 }).limit(1).exec();
    if (!maxPost) {
      // If no posts found, start postID from 1
      return 1;
    } else {
      // Increment the max postID found by 1
      return + maxPost.postID + 1;
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error generating unique postID:', error);
    throw error;
  }
};


  async function createPost(userID, content, attachment, visible) {
    try {
    // Generate a unique postID
    const postID_ = await generateUniquePostID(Post);
    // Create a new Post document
    const newPost = new Post({
    userID,
    postID: postID_,
    content,
    attachment,
    visible
    });
    // Save the new post to the database
    const savedPost = await newPost.save();
    console.log('Post created successfully:', savedPost);
    } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error creating post:', error);
    throw error; // Rethrow the error for further handling
    }
    }
    
  
  const commentSchema = new mongoose.Schema({
    postID: { type: mongoose.SchemaTypes.ObjectId, ref: 'Post', required: true },
    commentID: { type: String, required: true, unique: true },
    userID: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    // Timestamps can be automatically added by Mongoose
  }, { timestamps: { createdAt: 'created_at' } });
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  const isAuthenticated = (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('User not authenticated');
    }
    next();
  };
  
  

// Function to create a new user
async function createUser(userID, password, username, avatarPath = './Michael_photo.jpeg') {
  let avatarData; // Define a variable to store the avatar data
  if (avatarPath) {
    try {
      // Read the avatar file as binary data
      avatarData = fs.readFileSync(avatarPath);
    } catch (error) {
      console.error('Error reading the avatar file:', error.message);
      return; // Stop execution if there's an error with the avatar
    }
  }
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
    avatar : avatarData,
    introduction: null,
    background_image: null,
    newNotification: false,
    //self_post: [],
  });

  try {
    const result = await user.save();
    console.log('User created successfully:', result);
  } catch (error) {
    console.error('Error creating the user:', error.message);
  }
}

async function admincreateUser(userID, username, password, introduction) {
  const user = new User({
    userID,
    password,
    username,
    followers: [],
    following: [],
    likePost:[],
    dislikePost: [],
    favorite: [],
    avatar: null,
    introduction,
    background_image: null,
    newNotification: false,
    //self_post: [],

  });

  try {
    const result = await user.save();
    console.log('User created successfully:', result);
    return result; 
  } catch (error) {
    console.error('Error creating the user:', error.message);
    throw error; 
  }
}

async function admincreatepost(userID, content, visible, tag, like, dislike) {
  try {
  // Generate a unique postID
  const postID_ = await generateUniquePostID(Post);
  // Create a new Post document
  const newPost = new Post({
  postID: postID_,
  tag,
  content,
  attachment: null,
  userID,
  like,
  dislike,
  visible
  });
  // Save the new post to the database
  const savedPost = await newPost.save();
  console.log('Post created successfully:', savedPost);
  //console.log(postID_);
  //return postID_;
  } catch (error) {
  // Handle any errors that occur during the process
  console.error('Error creating post:', error);
  throw error; // Rethrow the error for further handling
  }
  }



// Sample data insertion
// Replace 'uniqueUserID', 'securePassword', and 'uniqueUsername' with actual values
//createUser('123', 'securePassword', 'uniqueUsername');
createUser('8', '3100', 'winnie');
createUser('100', '123', 'test', './hahaha.jpeg');
createUser('0', 'admin', 'admin'); //admin
//createUser('1', '123', 'File Transfer');
createPost("8","Hi, this is Winnie",attachment, 1);
// createPost("100","Hi, this is Winnie 2", 1);
// createPost("8","Hi, this is Winnie 3", 1);





//handle login authentication
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

// handle register: create new user
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


// handle admin: list all users
app.get("/listuser", async (req, res) => {
  try {
    let userData = await User.find({}, 'userID username password followers following likePost dislikePost favorite introduction').lean();


    for (let user of userData) {
      const posts = await Post.find({ 'userID': user.userID }, 'postID').lean();
      user.self_post = posts.map(post => post.postID);
    }

    console.log(`Fetched ${userData.length} users.`);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("Internal server error");
  }
});



// handle admin: delete a user
app.delete('/deleteuser/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const deletedUser = await User.findOneAndDelete({ userID: userID })
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User ${userID} deleted successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// handle admin: create a user
app.post('/createuser', async (req, res) => {

  try {
    const {userID, username, password, introduction} = req.body;
    admincreateUser(userID, password, username, introduction)

    res.status(201).json("good"); // Send the created user back
  } catch (error) {
    console.error('Error during creating user', error); // Log the full error
    res.status(400).json({ message: error.message });
  }


});


// handle admin: update a user
app.post('/updateuser', async (req, res) => {
  
    try {
      const {userID, username, password, followers, following, likePost, dislikePost, favorite, introduction} = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { userID: userID }, // Find a document with this userID
        {
          username: username,
          password: password,
          followers: followers,
          following: following,
          likePost: likePost,
          dislikePost: dislikePost,
          favorite: favorite,
          introduction: introduction,
        },
        {
          new: true, 
          runValidators: true, 
        }
      );
  
      if(updatedUser) {
        res.status(200).json(updatedUser); 
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during updating user', error); 
      res.status(400).json({ message: error.message });
    }
  
  
  });



// get user information associated with the postID
app.get('/userinfo/:postID', async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await Post.findOne({ postID });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userInfo = await User.findOne({ userID: post.userID })
                                .select('username avatar')
                                .exec();

    if (!userInfo) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// explore the post
app.get('/explore', async (req, res) => {
  try {
    let postData = await Post.find({}, 'postID userID tag attachment content visible like dislike');

    console.log(`Fetched ${postData.length} posts.`);

    if (postData.length === 0) {
      res.status(404).send("No posts found");
      return;
    }

    const randomIndex = Math.floor(Math.random() * postData.length);
    const randomPost = postData[randomIndex];

    console.log("Selected random post:", randomPost);
    res.json(randomPost);
  } catch (error) {
    console.error("Error fetching post data:", error);
    res.status(500).send("Internal server error");
  }
});

//browser the post
async function getFollowingPosts(userId) {
  try {
    // First, find the user's document to get the list of users they are following
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Then, fetch posts of the users the current user is following
    const followingPosts = await Post.find({ userID: { $in: user.following } })
      .sort({ post_time: -1 }) // Sorting by post time in descending order
      .populate('userID'); // Populate user details in the posts

    return followingPosts;
  } catch (error) {
    console.error('Error fetching following posts:', error);
    throw error; // Rethrow the error for handling by the caller
  }
};
app.get('/browser', async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await getFollowingPosts(userId);
    if (posts.length === 0) {
      res.status(404).send('No posts found');
      return;
    }
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal server error');
  }
});

//search function
async function searchPostsByContent(searchQuery) {
  try {
    // Ensure that the 'content' field has a text index
    await Post.createIndexes();

    // Perform search on the 'content' field using regex
    const matchPosts = await Post.find({ content: { $regex: searchQuery, $options: 'i' } })
      .populate('userID'); // Populate user details in the posts

    return matchPosts;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
app.get('/search', async (req, res) => {
  try {
    const content = req.query.content;
    console.log("!!!!!",content);
    const posts = await searchPostsByContent(content);
    if (posts.length === 0) {
      res.status(404).send('No posts found');
      return;
    }
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal server error');
  }
});

// handle admin: list all posts
app.get('/listpost', async (req, res) => {
  try {
    let postData = await Post.find({}, 'postID userID tag attachment content visible like dislike');


      console.log(`Fetched ${postData.length} posts.`);
      //console.log(postData);
      res.json(postData);
    } catch (error) {
      console.error("Error fetching post data:", error);
      res.status(500).send("Internal server error");
    }

});


// handle admin: delete a post
app.delete('/deletepost/:postID', async (req, res) => {
  try {
    const { postID } = req.params;
    const deletedPost = await Post.findOneAndDelete({ postID: postID })
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: `Post ${postID} deleted successfully` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// handle admin: create a post
app.post('/createpost', async (req, res) => {

  try {
    const {userID, content, visible, tag, like, dislike} = req.body;
    // try {
    //   const user = await User.findOne({ userID: userID });
    //   if (user) {
    //     console.log("Found user ID:", user._id);
    //     objectid = user._id; // Returning the ObjectId for further use
    //   } else {
    //     console.log("No user found with the userID:", userID);
    //     return null;
    //   }
    // } catch (err) {
    //   console.error("An error occurred:", err);
    //   return null;
    // }

    admincreatepost(userID, content, visible, tag, like, dislike)
    //attachPost2User(userID, new_postID)

    res.status(201).json("good"); 
  } catch (error) {
    console.error('Error during creating post', error); 
    res.status(400).json({ message: error.message });
  }


});

/**
 * PROFILE
 */
// app.get('/profile/:userID', async (req, res, next) => {
//   try {
//     const { userID } = req.params; // Use req.params to get the userID from the URL parameter
//     const userData = await User.findOne({ userID })
//                                 .select('avatar background_image username description following followers userID')
//                                 .exec();
  
//       const posts = await Post.find({ 'userID': userID }, 'postID').lean();
//       userData.self_post = posts.map(post => post.postID);
//       console.log(userData)

//     if (userData) {
//       res.json(userData);
//     } else {
//       next(); // Move to the next middleware if the user is not found
//     }
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// handle update profile: update a user's profile
app.post('/updateprofile', async (req, res) => {
  
    try {
      const {userID, username, password, introduction} = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { userID: userID }, // Find a document with this userID
        {
          username: username,
          password: password,
          //background_image: background_image,
          //avatar: avatar,
          introduction: introduction,
        },
        {
          new: true, 
          runValidators: true, 
        }
      );
  
      if(updatedUser) {
        res.status(200).json(updatedUser); 
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during updating user', error); 
      res.status(400).json({ message: error.message });
    }
  
  
  });









app.get('/profile/:userID', async (req, res, next) => {
  try {
    const { userID } = req.params; // Use req.params to get the userID from the URL parameter
    const userData = await User.findOne({ userID })
                                .select('avatar background_image username description following followers userID')
                                .exec();
  
    const posts = await Post.find({ 'userID': userID }, 'postID').lean();
    const userObject = userData.toObject(); // Convert Mongoose document to plain JavaScript object
    userObject.self_post = posts.map(post => post.postID);

    // console.log(userObject);

    if (userData) {
      res.json(userObject);
    } else {
      next(); // Move to the next middleware if the user is not found
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal server error");
  }
});


// list all posts in profile
app.get('/profilePosts/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    // console.log(userID);
    const postData = await Post.find({ userID })
                               .select('username postID content attachment userID like dislike visible post_time avatar')
                               .exec();
  
      const avatar = await User.find({ 'userID': userID }, 'avatar').lean();
      const userObject = postData; // Convert Mongoose document to plain JavaScript object
      userObject.avatar = avatar;

      console.log(userObject);

      console.log(`Fetched ${postData.length} posts.`);
      if (postData) {
        res.json(userObject);
      } else {
        next(); // Move to the next middleware if the user is not found
      }

  }catch (error) {
      console.error("Error fetching post data:", error);
      res.status(500).send("Internal server error");
    }
  });



  app.post("/post", async (req, res) => {
    try {
      // Assuming req.user is populated with the user's data after authentication
      const { userID, text_posted } = req.body;
    
      const attachment = null;
      const visible = 1;
      const content = text_posted;
      createPost(userID, content, attachment, visible)
      res.status(201).json('');
    } catch (error) {
      console.error("Create post error:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  app.get('/getallpost', async (req, res) => {
    try {
      let postData = await Post.find();
        // const postData = await Post.find({}, 'postID userID tag content visible like dislike')
        // .populate('userID', 'userID username') 
        // .lean();
  
        // console.log(`Fetched ${postData.length} posts.`);
        res.json(postData);
      } catch (error) {
        console.error("Error fetching post data:", error);
        res.status(500).send("Internal server error");
      }
    });
  

    app.post('/newdislike/:id', async (req, res) => {
      try {
        const postID = req.params.id; // Get the post ID from the URL parameter
        const userID = req.body.userID; // The userID of the user disliking the post
              // Find the post by ID and add the newDislike to the dislikes array
              const post = await Post.findOneAndUpdate(
                { postID: postID }, // Use postID from the schema to find the post
                { $inc: { dislike: 1 } }, // Increment the dislike field
                { new: true } // Return the updated document
              );
        const user = await User.findOneAndUpdate(
                { userID: userID },
                { $addToSet: { dislikePost: postID } },
                { new: true }
              );


          if (!post) {
            return res.status(404).send('Post not found');
          }
      
          // Return the updated post data
          res.status(200).json(user);
        } catch (error) {
          console.error('Error adding new dislike:', error);
          res.status(500).send('Internal Server Error');
        }
    });

    app.post('/checkdislike', async (req, res) => {
      try {
        const { id, userID } = req.body;
        
        // Assuming `id` is the post's ID and it's stored in the dislikePost array as an ObjectId
        const user = await User.findOne({ userID: userID, dislikePost:id });
        console.log(user)
        // If the user is found, it means the user has disliked the post
        if (user) {
          res.json({ isDisliked: true });
        } else {
          res.json({ isDisliked: false });
        }
      } catch (error) {
        console.error('Error checking dislike:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/getuser', async (req, res) => {
      try {
        const userID = req.body.userID;
        const userData = await User.findOne({ userID });
        if (userData) {
          res.json(userData);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal server error");
      }
    });

    app.post('/getusera', async (req, res) => {
      try {
        const userID = req.body.userID;
        const userData = await User.findOne({ userID });
        if (userData) {
          res.json(userData);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal server error");
      }
    });


    app.post('/newlike/:id', async (req, res) => {
      try {
        const postID = req.params.id; // Get the post ID from the URL parameter
        const userID = req.body.userID; // The userID of the user disliking the post
              // Find the post by ID and add the newDislike to the dislikes array
        const userData = await User.findOne({userID});
        console.log(userData.likePost)
        if(userData.likePost.includes(postID.toString())){
          const post = await Post.findOneAndUpdate(
            { postID: postID },
            { $inc: { like: -1 }},
            { new: true }
          );
          const user = await User.findOneAndUpdate(
            { userID: userID },
            { $pull: {likePost: postID} },
            { new: true }
          )
        }
        else{

          const post = await Post.findOneAndUpdate(
            { postID: postID },
            { $inc: { like: 1 }},
            { new: true }
          );
          const user = await User.findOneAndUpdate(
            { userID: userID },
            { $addToSet: {likePost: postID} },
            { new: true }
          )
        }

      
          // Return the updated post data
          res.status(200).json('');
        } catch (error) {
          console.error('Error adding new like:', error);
          res.status(500).send('Internal Server Error');
        }
    });

    app.get('/getfollowers/:userID', async (req, res, next) => {
      try {
        const { userID } = req.params; // Use req.params to get the userID from the URL parameter
        const followerList = await User.findOne({ userID })
                                    .select('followers')
                                    .exec();
        const followers = followerList.followers;
  
  
        const followerDetails = await Promise.all(followers.map(async (followerID) => {
          const followerProfile = await User.findOne({ 'userID': followerID })
                                              .select('avatar username')
                                              .lean()
                                              .exec();
          return {
              ...followerProfile, // Spread avatar and username
              _id: followerID // Add _id property to match the original followerID
          };
      }));
      console.log(followers);
      res.json(followerDetails);
  
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal server error");
      }
    });
      
    app.get('/getfollowings/:userID', async (req, res, next) => {
      try {
        const { userID } = req.params; // Use req.params to get the userID from the URL parameter
        const followingList = await User.findOne({ userID })
                                    .select('following')
                                    .exec();
        const followings = followingList.following;
  
  
        const followingDetails = await Promise.all(followings.map(async (followingID) => {
          const followingProfile = await User.findOne({ 'userID': followingID })
                                              .select('avatar username')
                                              .lean()
                                              .exec();
          return {
              ...followingProfile, // Spread avatar and username
              _id: followingID // Add _id property to match the original followerID
          };
      }));
      console.log(followings);
      res.json(followingDetails);
  
      } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send("Internal server error");
      }
    });

    app.get('/profileFavourites/:userID', async (req, res) => {
      try {
        const { userID } = req.params;

        const user = await User.findOne({ userID }).select('favorite').exec();
        // console.log('here is test',user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch favorite posts details
        const favoritePostList = user.favorite; // Assuming favorite is an array of postIDs
        console.log('here is test', favoritePostList);
        const postData = [];

        for (let postID of favoritePostList) {
            const post = await Post.findOne({ postID }).select('username postID content attachment userID like dislike visible post_time').exec();
            if (post) {
                postData.push(post);
            }
        }
        const avatar = await User.find({ 'userID': userID }, 'avatar').lean();
        const userObject = postData; // Convert Mongoose document to plain JavaScript object
        userObject.avatar = avatar;
        console.log(userObject);
        if (postData) {
          res.json(userObject);
        } else {
          next(); // Move to the next middleware if the user is not found
        }

      }catch (error) {
          console.error("Error fetching post data:", error);
          res.status(500).send("Internal server error");
        }
      });
      
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




