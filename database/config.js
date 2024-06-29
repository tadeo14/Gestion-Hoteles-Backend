const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://tadeo_14:laprida3399@project2.piejsm0.mongodb.net/?retryWrites=true&w=majority&appName=Project2'
        );
    } catch (error) {
        console.log(error);
    }
}; 