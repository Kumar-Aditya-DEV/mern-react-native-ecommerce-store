import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../src/components/Header';
import PrimaryButton from '../../src/components/PrimaryButton';
import QuantitySelector from '../../src/components/QuantitySelector';
import PriceDetails from '../../src/components/PriceDetails';
import EmptyState from '../../src/components/EmptyState';
import colors from '../../src/constants/colors';
import { CartContext } from '../../src/context/CartContext';
import { AuthContext } from '../../src/context/AuthContext';
import { customAlert } from '../../src/utils/alert';

export default function CartTabScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const isWide = width >= 768;

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 0 ? (subtotal > 150 ? 0 : 15) : 0;
  const taxAmount = subtotal * 0.08;
  const totalAmount = subtotal + shippingFee + taxAmount;

  const handleCheckoutPress = () => {
    if (!user) {
      customAlert(
        'Sign In Required',
        'Please sign in to proceed to checkout and place your order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => router.push('/login') }
        ]
      );
      return;
    }
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Shopping Cart" showBack={false} />
        <EmptyState
          icon="cart-outline"
          title="Your Cart is Empty"
          message="Looks like you haven't added any products to your cart yet."
          buttonTitle="Start Shopping"
          onButtonPress={() => router.push('/(tabs)')}
        />
      </SafeAreaView>
    );
  }

  const renderCartItem = ({ item }: { item: typeof cart[0] }) => (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.product.image }} style={styles.productImage} />
      <View style={styles.details}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.productPrice}>${item.product.price.toFixed(2)}</Text>
        <View style={styles.actions}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.product._id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.product._id, item.quantity - 1)}
          />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeFromCart(item.product._id)}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Shopping Cart" showBack={false} />

      {isWide ? (
        <View style={styles.wideContainer}>
          <View style={styles.itemsColumn}>
            <FlatList
              data={cart}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.listContentWide}
              renderItem={renderCartItem}
            />
          </View>

          <View style={styles.summaryColumn}>
            <View style={styles.summaryCard}>
              <PriceDetails
                subtotal={subtotal}
                shippingFee={shippingFee}
                taxAmount={taxAmount}
                totalAmount={totalAmount}
              />
              <PrimaryButton
                title="Proceed to Checkout"
                onPress={handleCheckoutPress}
                style={styles.checkoutBtn}
              />
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <View style={styles.footer}>
              <PriceDetails
                subtotal={subtotal}
                shippingFee={shippingFee}
                taxAmount={taxAmount}
                totalAmount={totalAmount}
              />
              <PrimaryButton
                title="Proceed to Checkout"
                onPress={handleCheckoutPress}
                style={styles.checkoutBtn}
              />
            </View>
          }
          renderItem={renderCartItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  wideContainer: {
    flexDirection: 'row',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    padding: 16,
    gap: 20,
    flex: 1,
  },
  itemsColumn: {
    flex: 1.5,
  },
  summaryColumn: {
    flex: 1,
    minWidth: 320,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listContentWide: {
    paddingBottom: 24,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.surfaceSubtle,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  removeBtn: {
    padding: 6,
  },
  footer: {
    marginTop: 12,
    marginBottom: 24,
  },
  checkoutBtn: {
    marginTop: 16,
  },
});
