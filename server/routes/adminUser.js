const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUser');
const authenticate = require('../middleware/authenticate')
const isAdmin = require('../middleware/IsAdminMiddleware');

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new AdminUser({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await AdminUser.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/protected-route', authenticate, (req, res) => {
  // Access only allowed for authenticated users
  res.status(200).json({ message: 'Protected route accessed' });
});

app.get('/admin-route', authenticate, isAdmin, (req, res) => {
  // Access only allowed for admin users
  res.status(200).json({ message: 'Admin route accessed' });
});

module.exports = router;


// Admin registration
// router.post('/register', (req, res) => {
//   const { username, password, email } = req.body;

//   // Check if the username or email already exists
//   AdminUser.exists({ $or: [{ username }, { email }] })
//     .then((exists) => {
//       if (exists) {
//         return res.status(400).json({ error: 'Username or email already exists' });
//       }

//       // Hash the password
//       bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//           return res.status(500).json({ error: 'Error hashing password' });
//         }

//         // Create a new admin user
//         const newAdminUser = new AdminUser({ username, password: hashedPassword, email });
//         newAdminUser
//           .save()
//           .then((adminUser) => {
//             res.status(201).json(adminUser);
//           })
//           .catch((err) => {
//             res.status(500).json({ error: 'Admin user could not be created' });
//           });
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: 'Error checking username or email existence' });
//     });
// });

// // AdminUser Login
// router.post('/login', async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       // Check if the username exists
//       const adminUser = await AdminUser.findOne({ username });
//       if (!adminUser) {
//         return res.status(404).json({ error: 'Admin user not found' });
//       }
//       // Check if the password is correct
//       const isPasswordValid = await bcrypt.compare(password, adminUser.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid password' });
//       }
//       res.json({ message: 'Login successful' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to login' });
//     }
//   });
  
//   // AdminUser Update
//   router.put('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { username, password } = req.body;
//       // Check if the admin user exists
//       const adminUser = await AdminUser.findById(id);
//       if (!adminUser) {
//         return res.status(404).json({ error: 'Admin user not found' });
//       }
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       // Update the admin user
//       adminUser.username = username;
//       adminUser.password = hashedPassword;
//       const updatedUser = await adminUser.save();
//       res.json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update admin user' });
//     }
//   });
  
//   // AdminUser Delete
//   router.delete('/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       // Delete the admin user
//       const deletedUser = await AdminUser.findByIdAndDelete(id);
//       if (!deletedUser) {
//         return res.status(404).json({ error: 'Admin user not found' });
//       }
//       res.json({ message: 'Admin user deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to delete admin user' });
//     }
//   });


