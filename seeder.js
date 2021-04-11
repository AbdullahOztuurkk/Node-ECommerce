const filestream = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load environment variables
dotenv.config({ path: "./config/config.env" });

//Import Models
const Products = require('./models/Product');
const Categories = require('./models/Category');
const Users = require('./models/User');
const { time } = require("console");

//Connect To Db
mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read JSON Files
const ProductJson = JSON.parse(
  filestream.readFileSync(`${__dirname}/_data/products.json`, "utf-8")
);
const CategoryJson = JSON.parse(
  filestream.readFileSync(`${__dirname}/_data/categories.json`, "utf-8")
);
const UsersJson = JSON.parse(
  filestream.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);


//Import data from json function
const ImportData = async () => {
  //try {
    await Categories.create(CategoryJson);
    await Products.create(ProductJson);
    await Users.create(UsersJson);
    console.log("Data Imported".green.inverse);
    process.exit();
  /*} catch (error) {
    console.error(error);
  }*/
};

//Destroy All Data function
const DeleteData = async () => {
  try {
    await Products.deleteMany();
    await Categories.deleteMany();
    await Users.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//command line options  Example : node seeder -i
if(process.argv[2] === '-i'){
    ImportData();
}
else if(process.argv[2]=== '-d'){
    DeleteData();
}
