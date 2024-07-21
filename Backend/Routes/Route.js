import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { Login } from "../Functions/adminfunction.js"; // Ensure this path is correct
import {
  PostResource,
  ApproveResource,
  GetResources,
  GetResourcesCategory,
  SearchResourcesbyTitle,
  SearchResourcesbyCategory,
} from "../Functions/Recoursefunction.js"; // Ensure this path is correct
const router = express.Router();
// Login route
router.post("/login", Login);
// Session validation route
router.use(cookieParser()); // Ensure cookie parser middleware is used
router.post("/validate-session", (req, res) => {
console.log("Request received:", req.method, req.url);
console.log("Request cookies:", req.cookies);
const token = req.cookies.token; // Ensure this matches the cookie name used to store the token
  if (!token) {
    console.log("No token provided");
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
    console.log("Token decoded successfully:", decoded);
    return res.status(200).send("Session valid");
  } catch (error) {
    console.log("Invalid token:", error.message);
    return res.status(401).send("Unauthorized: Invalid token");
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// Resource routes
router.post("/resources", PostResource);
router.patch("/resources/:id", ApproveResource);
router.get("/resources", GetResources);
router.get("/allcategories", GetResourcesCategory);
router.get("/resources/search/:title", SearchResourcesbyTitle);
router.get("/resources/search/:category", SearchResourcesbyCategory);
export default router;
