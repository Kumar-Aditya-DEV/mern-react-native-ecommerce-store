import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import StatusBadge from '../src/components/StatusBadge';
import colors from '../src/constants/colors';

const adminOrders = [
  { _id: 'o1', orderNumber: 'ORD-982415', customer: 'Alex Johnson', total: 199.99, status: 'Processing' as const },
  { _id: 'o2', orderNumber: 'ORD-451298', customer: 'Sarah Jenkins', total: 89.00, status: 'Shipped' as const },
  { _id: 'o3', orderNumber: 'ORD-112345', customer: 'Michael Brown', total: 149.50, status: 'Delivered' as const },
];

export default function ManageOrdersScreen(): React.JSX.Element {
  const router = useRouter();

  const handleUpdateStatus = (orderNum: string) => {
    Alert.alert('Update Status', `Select new status for ${orderNum}:`, [
      { text: 'Processing', onPress: () => Alert.alert('Updated', 'Order set to Processing') },
      { text: 'Shipped', onPress: () => Alert.alert('Updated', 'Order set to Shipped') },
      { text: 'Delivered', onPress: () => Alert.alert('Updated', 'Order set to Delivered') },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Orders" showBack onBackPress={() => router.back()} />

      <FlatList
        data={adminOrders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <StatusBadge status={item.status} />
            </View>

            <Text style={styles.customerText}>Customer: {item.customer}</Text>
            <Text style={styles.totalText}>Amount: ${item.total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.updateBtn} onPress={() => handleUpdateStatus(item.orderNumber)}>
              <Text style={styles.updateBtnText}>Update Order Status</Text>
            </TouchableOpacity>
          </View>
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
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  customerText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  totalText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 2,
  },
  updateBtn: {
    marginTop: 12,
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  updateBtnText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
