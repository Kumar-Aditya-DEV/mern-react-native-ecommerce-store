import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';

export default function OrderConfirmationScreen(): React.JSX.Element {
  const router = useRouter();
  const { orderNumber } = useLocalSearchParams<{ orderNumber?: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-sharp" size={48} color={colors.surface} />
        </View>

        <Text style={styles.title}>Order Placed Successfully! 🎉</Text>
        <Text style={styles.orderId}>Order #{orderNumber || 'ORD-982415'}</Text>
        <Text style={styles.subtitle}>
          Thank you for shopping with ShopVerse! We're processing your order and will notify you once shipped.
        </Text>

        <View style={styles.actions}>
          <PrimaryButton
            title="View Order Status"
            onPress={() => router.push('/orders')}
            style={styles.btn}
          />
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.secondaryBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    marginTop: 28,
  },
  btn: {
    marginBottom: 12,
  },
  secondaryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});
