import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface PriceDetailsProps {
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount?: number;
  totalAmount: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({
  subtotal,
  shippingFee,
  taxAmount,
  discountAmount = 0,
  totalAmount,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Price Details</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Items Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Shipping Fee</Text>
        <Text style={styles.value}>
          {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tax (8%)</Text>
        <Text style={styles.value}>${taxAmount.toFixed(2)}</Text>
      </View>

      {discountAmount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, styles.discountLabel]}>Discount</Text>
          <Text style={[styles.value, styles.discountValue]}>
            -${discountAmount.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total Payable</Text>
        <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  discountLabel: {
    color: colors.success,
  },
  discountValue: {
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
});

export default PriceDetails;
