const { Router } = require("express");
const loginRoute = require("./login.js");
const petsRoute = require("./pets.js");
const userRoute = require("./user.js");
const transporterRoute = require("./nodeMailer.js");
const chatMessage = require("./message.js");
const adoption = require("./adoption.js");
const successStoriesRoute = require("./successStories.js");
const donationsRoute = require("./donations.js");
const page = require("./page.js");
const locations = require('./page.js');
// const adminRoute = require("./admin.js");
const cors = require("cors");
const notification = require("./notification");

const router = Router();
router.use(cors());

// router.use("/owners", ownersRoute);
router.use("/", page);
router.use("/locations", page)
router.use("/message", chatMessage);
router.use("/pets", petsRoute);
router.use("/login", loginRoute);
router.use("/user", userRoute);
router.use("/user", userRoute);
router.use("/nodeMailer", transporterRoute);
// router.use("/c/:idhat", chatRoIdute);
router.use("/adoption", adoption);
router.use("/successStories", successStoriesRoute);
router.use("/donations", donationsRoute);
// router.use("/admin", adminRoute);
router.use("/notification", notification);

module.exports = router;
