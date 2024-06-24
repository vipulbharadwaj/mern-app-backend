require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://mern-app-frontend-blue.vercel.app",
        "https://mern-app-backendd.onrender.com/service"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(router);
app.use(contactRoute);
app.use(serviceRoute);
app.use(adminRoute);

//app.use(require('./router/auth-router'));
app.use(errorMiddleware);

     
const PORT = process.env.PORT || 5000;
connectDb().then(() => {
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
});