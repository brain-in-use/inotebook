const mongoose = require('mongoose');
const mongoUri="mongodb://localhost:27017";

// const connectToMongo=()=>{
//     mongoose.connect(mongoUri, ()=>{
//         console.log("Connected to Mongo Successfull")
//     })
// }

const connectToMongo = () => {
    mongoose.connect(mongoUri)
        .then(() => console.log("Connected to Mongo Successfully"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));
};


module.exports=connectToMongo;

