import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import StatusBadge from '../src/components/StatusBadge';
import colors from '../src/constants/colors';
import { Order } from '../src/types';

const mockOrders: Order[] = [
  {
    _id: 'ord-1',
    orderNumber: 'ORD-982415',
    items: [],
    shippingAddress: {
      _id: 'a1',
      fullName: 'Alex Johnson',
      phone: '+91 9876543210',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zipCode: '97477',
      country: 'USA'
    },
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    totalAmount: 199.99,
    shippingFee: 0,
    taxAmount: 16.00,
    status: 'Processing',
    createdAt: '2026-08-28T10:30:00Z',
    updatedAt: '2026-08-28T10:30:00Z',
  },
  {
    _id: 'ord-2',
    orderNumber: 'ORD-451298',
    items: [],
    shippingAddress: {
      _id: 'a1',
      fullName: 'Alex Johnson',
      phone: '+91 9876543210',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zipCode: '97477',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    totalAmount: 89.00,
    shippingFee: 15,
    taxAmount: 7.12,
    status: 'Delivered',
    createdAt: '2026-08-20T14:15:00Z',
    updatedAt: '2026-08-22T16:00:00Z',
  }
];

export default function OrdersScreen(): React.JSX.Element {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Orders" showBack onBackPress={() => router.back()} />

      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => router.push({ pathname: '/order-details', params: { id: item._id } })}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <StatusBadge status={item.status} />
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.dateText}>
                Placed on {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.amountText}>Total: ${item.totalAmount.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  orderCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
