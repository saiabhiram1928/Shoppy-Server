const Products = require('../models/product.js')
const asyncHandler = require('../middleware/asyncHandler.js')

//@desc   Fetch all products
//@route  GET /products
//@acess  Public
const getProducts = asyncHandler(async(req, res) => {
    console.log("/products called")
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
    const products = await Products.find({ ...keyword })
    res.json(products);
  })
//@desc   Fetch a product
//@route  GET /products/:id
//@acess  Public
const getProductById = asyncHandler(async(req, res) => {
    console.log("/products/:id called")
    const product = await Products.findById(req.params.id)
    if(product) return res.json(product);
    else{
        res.status(404)
        throw new Error("product not found")
    }
 
  })
  // @desc    Create new review
// @route   POST /products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.review.push(review);

    product.numReviews = product.review.length;

    product.rating =
      product.review.reduce((acc, item) => item.rating + acc, 0) /
      product.review.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// @desc    Get top rated products
// @route   GET /products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  console.log("top products called")
  const products = await Products.find().sort({ rating: -1 }).limit(3);
  res.json(products);
});
  module.exports.getProductById =getProductById
  module.exports.getProducts =getProducts
  module.exports.createProductReview=createProductReview
  module.exports.getTopProducts = getTopProducts