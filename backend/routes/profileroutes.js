const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");


// Get User Profile
router.get(
    "/",
    authMiddleware,
    profileController.getProfile
);


// Update User Profile
router.put(
    "/update",
    authMiddleware,
    profileController.updateProfile
);


module.exports = router;