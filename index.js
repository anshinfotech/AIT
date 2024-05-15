require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const adminRoute = require("./Routes/adminRoutes.js");
const formRoute = require("./Routes/formRoutes.js");
const contactRoute = require("./Routes/contactRoutes.js");
const enquiryRoute = require("./Routes/enquiryRoutes.js");
const registerRoute = require("./Routes/registrationRoutes.js");
const reviewRoute = require("./Routes/reviewRoutes.js");
const teamRoute = require("./Routes/teamRoutes.js");
const DB = require("./database.js");
app.use(cookieParser());

DB();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.static(path.join(__dirname, "public")));
// Route for handling registration

app.use("/api", registerRoute);

app.use("/api", enquiryRoute);

app.use("/api", contactRoute);

app.use("/api", formRoute);

app.use("/api", adminRoute);

app.use("/api", reviewRoute);

app.use("/api", teamRoute);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
