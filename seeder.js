const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const products = require('./data/products.js')
const User =require('./models/user.js')
const Product =require('./models/product.js')
const Order =require('./models/order.js')
dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  useNewurlParser: true,
});

mongoose.connection
  .once("open", () => {
    console.log("db connected");
  })
  .on("error", (err) => {
    console.error(err);
  });


const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
