const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, variant = 'Standard' } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.variant === variant
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity), variant });
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json({ success: true, message: 'Item added to cart', data: updatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/item
// @access  Private
const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity, variant = 'Standard' } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => !(item.product.toString() === productId && item.variant === variant)
        );
      } else {
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === productId && item.variant === variant
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = quantity;
        }
      }
      await cart.save();
      const updated = await Cart.findById(cart._id).populate('items.product');
      res.json({ success: true, message: 'Cart updated', data: updated });
    } else {
      res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/item/:productId
// @access  Private
const removeCartItem = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== req.params.productId
      );
      await cart.save();
      const updated = await Cart.findById(cart._id).populate('items.product');
      res.json({ success: true, message: 'Item removed from cart', data: updated });
    } else {
      res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
