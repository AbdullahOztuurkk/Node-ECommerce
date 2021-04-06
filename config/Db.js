const mongoose=require('mongoose');

const connectDb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL , {
        useCreateIndex      :   true,
        useNewUrlParser     :   true,
        useFindAndModify    :   false,
        useUnifiedTopology  :   true
    });

    console.log('MongoDb connected.'.white)
}
module.exports=connectDb;