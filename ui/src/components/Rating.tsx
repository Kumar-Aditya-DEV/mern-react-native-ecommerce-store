import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface RatingProps {
  rating: number;
  numReviews?: number;
  showCount?: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, numReviews, showCount = false }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="star" size={14} color={colors.star} />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      {showCount && numReviews !== undefined && (
        <Text style={styles.reviewText}>({numReviews} reviews)</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 3,
  },
  reviewText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default Rating;
