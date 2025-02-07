const router = require('express').Router();
const userRoutes = require('./userRoutes');
const AdminRoutes = require('./AdminRoutes');
const CategoryRoutes = require('./CategaryRoutes'); 
const subcategory = require('./Subcategory');
const ProductRoutes = require('./ProductRoutes');
const Product = require('./models/Product');
// Import other route files as needed

router.use('/users', userRoutes); 

router.use('/admin', AdminRoutes);
  // for admin routes
  router.use('/category', CategoryRoutes);
  router.use('/subcategory',subcategory);
  router.use('/product',ProductRoutes)


module.exports = router;
