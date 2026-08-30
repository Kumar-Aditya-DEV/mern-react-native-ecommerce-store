import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../src/components/Header';
import ProductCard from '../src/components/ProductCard';
import colors from '../src/constants/colors';
import mockProducts from '../src/data/products';
import { CartContext } from '../src/context/CartContext';

export default function ProductListScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { addToCart } = useContext(CartContext);

  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : width <= 340 ? 1 : 2;
  const gridItemWidth = `${100 / numColumns}%`;

  const filteredProducts = category
    ? mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : mockProducts;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={category ? `${category} Products` : 'All Products'}
        showBack
        onBackPress={() => router.back()}
        rightIcon="filter-outline"
        onRightIconPress={() => router.push('/filter')}
      />

      <FlatList
        key={numColumns}
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.gridItem, { width: gridItemWidth as any }]}>
            <ProductCard
              product={item}
              onPress={() => router.push({ pathname: '/product-details', params: { id: item._id } })}
              onAddToCart={() => addToCart(item, 1)}
            />
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
    padding: 10,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  gridItem: {
    paddingHorizontal: 6,
  },
});
