import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import mockCategories from '../src/data/categories';

export default function FilterScreen(): React.JSX.Element {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>('featured');

  const handleApply = () => {
    router.replace({
      pathname: '/product-list',
      params: selectedCat ? { category: selectedCat } : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Filter Products" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.chipGroup}>
          {mockCategories.map((cat) => (
            <TouchableOpacity
              key={cat._id}
              style={[styles.chip, selectedCat === cat.name && styles.selectedChip]}
              onPress={() => setSelectedCat(selectedCat === cat.name ? null : cat.name)}
            >
              <Text style={[styles.chipText, selectedCat === cat.name && styles.selectedChipText]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Sort By</Text>
        {[
          { id: 'featured', label: 'Featured & Trending' },
          { id: 'price-low', label: 'Price: Low to High' },
          { id: 'price-high', label: 'Price: High to Low' },
          { id: 'rating', label: 'Customer Rating' },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.sortRow, selectedSort === item.id && styles.selectedSortRow]}
            onPress={() => setSelectedSort(item.id)}
          >
            <Text style={styles.sortLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <PrimaryButton title="Apply Filters" onPress={handleApply} />
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 10,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  selectedChipText: {
    color: colors.surface,
  },
  sortRow: {
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedSortRow: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
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
