import Admin from "../Models/Admin.js";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const admin = await Admin.findOne({ email });

    if (admin && !admin.pending) {
      if (admin.password === password) {
        const token = jwt.sign(
          { id: admin._id, role: admin.role, email: admin.email },
          process.env.SECRET_KEY,
          { expiresIn: "1m" } // 1 minute expiration
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 1000, // 1 minute
        });

        return res.status(200).json({ status: true });
      } else {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
    } else if (admin?.pending) {
      return res.status(401).json({ message: "Your request is pending!" });
    } else {
      return res.status(401).json({ message: "Account not found!" });
    }
  } catch (err) {
    console.log("Error in login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export { Logout, Login };
