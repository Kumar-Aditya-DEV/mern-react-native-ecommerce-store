import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import SearchBar from '../src/components/SearchBar';
import ProductCard from '../src/components/ProductCard';
import EmptyState from '../src/components/EmptyState';
import colors from '../src/constants/colors';
import mockProducts from '../src/data/products';
import { CartContext } from '../src/context/CartContext';

export default function SearchScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { addToCart } = useContext(CartContext);
  const [query, setQuery] = useState('');

  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : width <= 340 ? 1 : 2;
  const gridItemWidth = `${100 / numColumns}%`;

  const filtered = query.trim()
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(query.toLowerCase()))
      )
    : mockProducts;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        placeholder="Search headphones, shoes, bags..."
        autoFocus
        onFilterPress={() => router.push('/filter')}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="No Results Found"
          message={`We couldn't find any products matching "${query}".`}
        />
      ) : (
        <FlatList
          key={numColumns}
          data={filtered}
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
      )}
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
