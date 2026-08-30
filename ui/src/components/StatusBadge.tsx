import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bg: string = colors.primaryLight;
  let text: string = colors.primary;

  if (status === 'Delivered') {
    bg = colors.successLight;
    text = colors.success;
  } else if (status === 'Processing' || status === 'Shipped') {
    bg = colors.warningLight;
    text = colors.warning;
  } else if (status === 'Cancelled') {
    bg = colors.errorLight;
    text = colors.error;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});

export default StatusBadge;
