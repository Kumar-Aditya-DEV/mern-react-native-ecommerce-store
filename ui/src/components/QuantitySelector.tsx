import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, quantity <= min && styles.disabledBtn]}
        onPress={onDecrease}
        disabled={quantity <= min}
      >
        <Ionicons name="remove" size={16} color={quantity <= min ? colors.textMuted : colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={[styles.btn, quantity >= max && styles.disabledBtn]}
        onPress={onIncrease}
        disabled={quantity >= max}
      >
        <Ionicons name="add" size={16} color={quantity >= max ? colors.textMuted : colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start',
  },
  btn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});

export default QuantitySelector;
