require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

// Custom imports
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const adminUserRoutes = require("./routes/admin/userRouteAdmin");
const adminCategoryRoutes = require("./routes/admin/categoryRouteAdmin");
const adminProductRoutes = require("./routes/admin/productRouteAdmin");

const app = express();

// Environment config
const PORT = process.env.PORT || 5050;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/category", adminCategoryRoutes);
app.use("/api/admin/product", adminProductRoutes);

// Test and example routes
app.get("/", (req, res) => {
  res.status(200).send("Hell!!o world 2000");
});

app.get("/post/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.query);
  res.status(200).send("Success");
});

const users = [
  { id: 1, name: "saroj", email: "saroj@gmail.com" },
  { id: 2, name: "sushant", email: "sushant@gmail.com" },
  { id: 3, name: "bhumi", email: "bhumi@gmail.com" },
];

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = users.find((user) => user.id === id);

  if (!found) return res.status(400).send("Failure");

  if (req.query.name && req.query.name === found.name) {
    return res.status(200).send("Success");
  } else {
    return res.status(500).send("Server Error");
  }
});

app.get("/users/:id/:name", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.params.name;
  const found = users.find((user) => user.id === id && user.name === name);

  if (found) return res.status(200).send("Success");
  else return res.status(400).send("Failure");
});

// Blog-related dummy data and routes
let blogs = [
  { id: 1, name: "Nikesh", title: "Trip to pokhara", desc: "Lorem ipsum" },
  { id: 2, name: "Subham", title: "My life of softwarica", desc: "Lorem ipsum" },
  { id: 3, name: "Kushal", title: "Trip to kakani", desc: "Lorem ipsum" },
];

// Get all blogs
app.get("/blogs", (req, res) => {
  res.status(200).json({ success: true, blogs });
});

// Get single blog
app.get("/blogs/:blogId", (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const found = blogs.find((blog) => blog.id === blogId);

  if (found) {
    res.status(200).json({ success: true, blog: found });
  } else {
    res.status(404).json({ success: false, message: "Blog not found" });
  }
});

// Create a blog
app.post("/blogs", (req, res) => {
  const { id, name, title, desc } = req.body;

  if (!id || !name || !title || !desc) {
    return res.status(400).json({
      success: false,
      message: "Not enough data",
    });
  }

  blogs.push({ id, name, title, desc });
  res.status(201).json({
    success: true,
    message: "Blog added",
  });
});

// Update a blog
app.put("/blogs/:blogid", (req, res) => {
  const blogId = parseInt(req.params.blogid);
  const { name, title, desc } = req.body;

  const foundIdx = blogs.findIndex((blog) => blog.id === blogId);

  if (foundIdx === -1) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  blogs[foundIdx] = { ...blogs[foundIdx], name, title, desc };

  res.status(200).json({
    success: true,
    message: "Blog updated",
  });
});

// Delete a blog
app.delete("/blogs/:blogId", (req, res) => {
  const blogId = parseInt(req.params.blogId);
  blogs = blogs.filter((blog) => blog.id !== blogId);

  res.status(200).json({
    success: true,
    message: "Blog deleted",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
