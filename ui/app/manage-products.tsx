import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import mockProducts from '../src/data/products';

export default function ManageProductsScreen(): React.JSX.Element {
  const router = useRouter();

  const handleDelete = (name: string) => {
    Alert.alert('Delete Product', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Deleted', 'Product removed.') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Products" showBack onBackPress={() => router.back()} />

      <View style={styles.topAction}>
        <PrimaryButton
          title="+ Add New Product"
          onPress={() => router.push('/add-product')}
        />
      </View>

      <FlatList
        data={mockProducts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)} (Stock: {item.stockCount})</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleDelete(item.name)}>
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
            </View>
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
  topAction: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.surfaceSubtle,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 8,
  },
});
