import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../src/components/Header';
import ProductCard from '../src/components/ProductCard';
import colors from '../src/constants/colors';
import mockProducts from '../src/data/products';
import { Product } from '../src/types';
import { CartContext } from '../src/context/CartContext';
import productService from '../src/services/productService';

export default function ProductListScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => {
      setLoading(true);
      const res = await productService.getProducts({ category });
      if (isMounted) {
        if (res && res.length > 0) {
          setProducts(res);
        }
        setLoading(false);
      }
    };
    loadProducts();
    return () => { isMounted = false; };
  }, [category]);

  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : width <= 340 ? 1 : 2;
  const gridItemWidth = `${100 / numColumns}%`;

  const filteredProducts = category
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products;

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
