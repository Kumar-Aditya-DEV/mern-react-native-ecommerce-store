import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../src/components/Header';
import colors from '../../src/constants/colors';
import mockCategories from '../../src/data/categories';
import { Category } from '../../src/types';
import categoryService from '../../src/services/categoryService';

export default function CategoriesTabScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      const res = await categoryService.getCategories();
      if (isMounted && res && res.length > 0) {
        setCategories(res);
      }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  const numColumns = width >= 1024 ? 3 : width >= 600 ? 2 : 1;
  const itemWidth = `${100 / numColumns}%`;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="All Categories" showBack={false} />
      <FlatList
        key={numColumns}
        data={categories}
        numColumns={numColumns}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.cardWrapper, { width: itemWidth as any }]}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/product-list', params: { category: item.name } })}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={(item.icon as keyof typeof Ionicons.glyphMap) || 'grid-outline'}
                  size={26}
                  color={colors.primary}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.itemCount || 0} Products</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
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
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  cardWrapper: {
    paddingHorizontal: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  count: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
