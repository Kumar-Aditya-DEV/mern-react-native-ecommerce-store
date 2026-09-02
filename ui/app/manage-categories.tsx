import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import mockCategories from '../src/data/categories';

export default function ManageCategoriesScreen(): React.JSX.Element {
  const router = useRouter();

  const handleAdd = () => {
    Alert.prompt('New Category', 'Enter category name:', (name) => {
      if (name) Alert.alert('Created', `Category "${name}" created.`);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Categories" showBack onBackPress={() => router.back()} />

      <View style={styles.topAction}>
        <PrimaryButton title="+ Add New Category" onPress={handleAdd} />
      </View>

      <FlatList
        data={mockCategories}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={(item.icon as any) || 'grid-outline'} size={22} color={colors.primary} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.count}>{item.itemCount || 0} Items</Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => Alert.alert('Delete', `Remove ${item.name}?`)}>
              <Ionicons name="trash-outline" size={18} color={colors.error} />
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
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
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
  count: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deleteBtn: {
    padding: 6,
  },
});
