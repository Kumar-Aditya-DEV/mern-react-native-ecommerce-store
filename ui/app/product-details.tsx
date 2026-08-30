import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import Rating from '../src/components/Rating';
import PrimaryButton from '../src/components/PrimaryButton';
import QuantitySelector from '../src/components/QuantitySelector';
import colors from '../src/constants/colors';
import mockProducts from '../src/data/products';
import { CartContext } from '../src/context/CartContext';
import { WishlistContext } from '../src/context/WishlistContext';
import { customAlert } from '../src/utils/alert';

export default function ProductDetailsScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const product = mockProducts.find((p) => p._id === id) || mockProducts[0];
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(product._id);
  const isWide = width >= 768;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    customAlert('Added to Cart 🛒', `${product.name} (x${quantity}) has been added to your cart.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Product Details"
        showBack
        onBackPress={() => router.back()}
        rightIcon={isWishlisted ? 'heart' : 'heart-outline'}
        onRightIconPress={() => toggleWishlist(product)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={isWide ? styles.wideRow : styles.narrowCol}>
          {/* Main Image */}
          <View style={[styles.imageContainer, isWide && styles.imageContainerWide]}>
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            {product.discountPercentage && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
              </View>
            )}
          </View>

          {/* Product Details Header */}
          <View style={[styles.infoCard, isWide && styles.infoCardWide]}>
            <Text style={styles.brand}>{product.brand || product.category}</Text>
            <Text style={styles.name}>{product.name}</Text>

            <View style={styles.ratingRow}>
              <Rating rating={product.rating} numReviews={product.numReviews} showCount />
              <View style={styles.stockBadge}>
                <Text style={styles.stockText}>In Stock ({product.stockCount})</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Text style={styles.sectionTitle}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />

            {isWide && (
              <View style={styles.wideButtonWrapper}>
                <PrimaryButton
                  title={`Add to Cart ($${(product.price * quantity).toFixed(2)})`}
                  onPress={handleAddToCart}
                  style={styles.addBtn}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions Bar on Mobile */}
      {!isWide && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.cartIconBtn} onPress={() => router.push('/(tabs)/cart')}>
            <Ionicons name="cart-outline" size={24} color={colors.primary} />
          </TouchableOpacity>

          <PrimaryButton
            title={`Add to Cart ($${(product.price * quantity).toFixed(2)})`}
            onPress={handleAddToCart}
            style={styles.addBtn}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  narrowCol: {
    width: '100%',
  },
  wideRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 24,
    alignItems: 'flex-start',
  },
  imageContainer: {
    height: 280,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  imageContainerWide: {
    flex: 1,
    height: 400,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 12,
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: 20,
    marginTop: 12,
    borderRadius: 24,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoCardWide: {
    flex: 1.2,
    marginTop: 0,
    marginHorizontal: 0,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  stockBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 14,
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  wideButtonWrapper: {
    marginTop: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  cartIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addBtn: {
    flex: 1,
  },
});
