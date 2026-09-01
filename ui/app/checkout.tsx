import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import PrimaryButton from '../src/components/PrimaryButton';
import PriceDetails from '../src/components/PriceDetails';
import colors from '../src/constants/colors';
import { CartContext } from '../src/context/CartContext';
import { Order } from '../src/types';

export default function CheckoutScreen(): React.JSX.Element {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Credit Card' | 'UPI'>('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 150 ? 0 : 15;
  const taxAmount = subtotal * 0.08;
  const totalAmount = subtotal + shippingFee + taxAmount;

  const defaultAddress = {
    _id: 'addr-1',
    fullName: 'Alex Johnson',
    phone: '+91 9876543210',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zipCode: '97477',
    country: 'USA'
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newOrder: Order = {
        _id: `ord-${Date.now()}`,
        orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cart.map((item) => ({
          _id: item._id,
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: defaultAddress,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        totalAmount,
        shippingFee,
        taxAmount,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      clearCart();
      router.replace({ pathname: '/order-confirmation', params: { orderNumber: newOrder.orderNumber } });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Checkout" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Shipping Address Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Shipping Address</Text>
            <TouchableOpacity onPress={() => router.push('/address')}>
              <Text style={styles.changeLink}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressName}>{defaultAddress.fullName} ({defaultAddress.phone})</Text>
          <Text style={styles.addressText}>{defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}</Text>
        </View>

        {/* Payment Method Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="card" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>

          {(['Cash on Delivery', 'Credit Card', 'UPI'] as const).map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.methodOption,
                paymentMethod === method && styles.selectedMethod
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Ionicons
                name={paymentMethod === method ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={paymentMethod === method ? colors.primary : colors.textMuted}
              />
              <Text style={styles.methodLabel}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <PriceDetails
            subtotal={subtotal}
            shippingFee={shippingFee}
            taxAmount={taxAmount}
            totalAmount={totalAmount}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <PrimaryButton
            title={`Place Order ($${totalAmount.toFixed(2)})`}
            onPress={handlePlaceOrder}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 8,
    flex: 1,
  },
  changeLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addressText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  selectedMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 10,
  },
  bottomBarWrapper: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
  },
  bottomBar: {
    padding: 16,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
});
