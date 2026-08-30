import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={(category.icon as keyof typeof Ionicons.glyphMap) || 'grid-outline'}
        size={22}
        color={isSelected ? colors.surface : colors.primary}
      />
      <Text style={[styles.name, isSelected && styles.selectedText]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  name: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedText: {
    color: colors.surface,
    fontWeight: '700',
  },
});

export default CategoryCard;
