let express=require('express');
let mongoose=require('mongoose');
let cors=require('cors');
const enquiryRoute=require('./App/routes/web/enquiryRoute');
require('dotenv').config();
let app=express();

// CORS configuration for GitHub Pages and local dev
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://suyash-666.github.io'
    ],
    credentials: true
}));

app.use(express.json());
app.use('/api/website/enquiry',enquiryRoute)

// Root status route for Render
app.get('/', (req, res) => {
    res.send({ status: 1, message: 'UserEnquiry API is running' });
});
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("DB connected");
    app.listen(process.env.PORT || 3000);
}).catch((err)=>{
    console.log("DB connection failed", err);
});