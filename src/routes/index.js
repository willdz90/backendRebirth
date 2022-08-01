const { Router } = require("express");
const loginRoute = require("../controllers/login.js");
const petsRoute = require("../controllers/pets.js");
const userRoute = require("../controllers/user.js");
const transporterRoute = require("../controllers/nodeMailer.js");
//const chatRoute = require("./chat.js");
const adoption = require("../controllers/adoption.js");
const successStoriesRoute = require("../controllers/successStories.js");
const donationsRoute = require("../controllers/donations.js");
// const adminRoute = require("./admin.js");
const cors = require("cors");
 
const router = Router();
router.use(cors());

// router.use("/", petsRoute)
// router.use("/owners", ownersRoute);
router.use("/pets", petsRoute);
router.use("/login", loginRoute);
router.use("/user", userRoute); 
router.use("/user", userRoute);
router.use("/nodeMailer", transporterRoute);
//router.use("/chat", chatRoute);
// router.use("/c/:idhat", chatRoIdute);
router.use("/adoption", adoption);
router.use("/successStories", successStoriesRoute);
router.use("/donations", donationsRoute);
// router.use("/admin", adminRoute);

module.exports = router;
