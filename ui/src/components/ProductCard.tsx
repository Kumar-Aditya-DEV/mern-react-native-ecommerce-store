import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import Rating from './Rating';
import { Product } from '../types';
import { WishlistContext } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
  horizontal?: boolean;
  style?: ViewStyle;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  horizontal = false,
  style,
}) => {
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const isWishlisted = isInWishlist(product._id);
  const imageUrl = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : (product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop');

  if (horizontal) {
    return (
      <TouchableOpacity
        style={[styles.horizontalCard, style]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image source={{ uri: imageUrl }} style={styles.horizontalImage} />
        <View style={styles.horizontalDetails}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        {product.discountPercentage && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{product.discountPercentage}%</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => toggleWishlist(product)}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={isWishlisted ? colors.error : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Rating rating={product.rating} numReviews={product.numReviews} />

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          {onAddToCart && (
            <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
              <Ionicons name="cart-outline" size={16} color={colors.surface} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 10,
    marginRight: 14,
    width: 270,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    height: 145,
    width: '100%',
    backgroundColor: '#F8FAFC',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  horizontalImage: {
    width: 84,
    height: 84,
    borderRadius: 14,
  },
  horizontalDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 10,
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  details: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 3,
    height: 36,
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  addBtn: {
    backgroundColor: colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default ProductCard;
