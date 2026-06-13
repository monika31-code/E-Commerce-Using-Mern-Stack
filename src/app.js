const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const authRoutes = require("../src/routes/auth.route")
const productRoutes = require("../src/routes/product.route")
const categoryRoutes = require("./routes/category.route")

app.use(express.json())
app.use(cookieParser());

app.use("/auth/api/", authRoutes);
app.use("/product/api", productRoutes)
app.use("/category/api", categoryRoutes)

module.exports = app;