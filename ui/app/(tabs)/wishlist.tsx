import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../src/components/Header';
import ProductCard from '../../src/components/ProductCard';
import EmptyState from '../../src/components/EmptyState';
import colors from '../../src/constants/colors';
import { WishlistContext } from '../../src/context/WishlistContext';
import { CartContext } from '../../src/context/CartContext';
import { AuthContext } from '../../src/context/AuthContext';

export default function WishlistTabScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const numColumns = width >= 1100 ? 4 : width >= 768 ? 3 : width <= 340 ? 1 : 2;
  const gridItemWidth = `${100 / numColumns}%`;

  if (wishlist.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Wishlist" showBack={false} />
        <EmptyState
          icon="heart-outline"
          title={user ? "Your Wishlist is Empty" : "Sign In to Save Wishlist"}
          message={user ? "Save items you love to view them later or move them to cart." : "Sign in to save your favorite products and sync them across device sessions."}
          buttonTitle={user ? "Explore Products" : "Sign In Now"}
          onButtonPress={() => user ? router.push('/(tabs)') : router.push('/login')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`My Wishlist (${wishlist.length})`} showBack={false} />
      <FlatList
        key={numColumns}
        data={wishlist}
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
