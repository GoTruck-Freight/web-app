const AdminUser = require('../models/adminUser');

const isAdmin = async (req, res, next) => {
  try {
    // Check if the user is an admin
    const user = await AdminUser.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isAdmin;
