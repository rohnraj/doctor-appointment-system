import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  console.log("Cookies received:", req.cookies);
  const token = req.cookies?.token;
  console.log(token)
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Forbidden" });
    req.user = user;
    
    console.log("✅ JWT Verified, Moving to Next Middleware");
    next();
  });
};

// export const isAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admins only." });
//     }
//     next();
//   };
