const express = require('express');
const cors = require('cors');
const User = require('./mongo.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtAuth = require('./jwtAuth');

const app = express();
app.use(express.json());

PORT = 5000;

app.use(cors());

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.status(409).json({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ 
      username, 
      password: hashedPassword 
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    console.log(user._id);
    const token = jwt.sign({ userId: user._id.toString() }, 'my_jwt_secret', { expiresIn: '1h' });
    res.json({ message: "Login successful!", token });

  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

app.post('/favourites', jwtAuth, async (req, res) => {
    const user = req.user;
    console.log(user._id);
    const movie  = JSON.stringify(req.body);

    try {
      const updatedUser = await User.findByIdAndUpdate(user._id, 
                { $addToSet: { favourites: movie } }, 
                { new: true });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error adding movie to favourites', error });
    }
});

app.get('/favourites', jwtAuth, async (req, res) => {
  const userId = req.user._id;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      const favourites = user.favourites.map(fav => JSON.parse(fav));
      res.json(favourites);
  } catch (error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

app.delete('/favourites/:movieId', jwtAuth, async (req, res) => {
  const userId = req.user._id;
  const movieIdToRemove = parseInt(req.params.movieId);
  console.log(movieIdToRemove);

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Filter out the movie to remove
      const updatedFavourites = user.favourites.filter(fav => {
          const favObj = JSON.parse(fav);
          return favObj.movie.id !== movieIdToRemove;
      });

      // Update the user's favourites
      user.favourites = updatedFavourites;
      await user.save();

      res.status(200).json({ message: "Movie removed from favourites" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred", error: error.message });
  }
});


app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));