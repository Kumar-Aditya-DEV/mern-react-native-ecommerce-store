import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import InputField from '../src/components/InputField';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';

export default function AddProductScreen(): React.JSX.Element {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!name || !price || !category) {
      Alert.alert('Validation Error', 'Please fill in product name, price, and category.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Product Created ✅', 'New product has been added to catalog.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add New Product" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <InputField label="Product Title" placeholder="e.g. Wireless Earbuds" value={name} onChangeText={setName} />
          <InputField label="Category" placeholder="e.g. Electronics" value={category} onChangeText={setCategory} />
          <InputField label="Price ($)" placeholder="99.99" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <InputField label="Stock Count" placeholder="25" value={stock} onChangeText={setStock} keyboardType="numeric" />
          <InputField label="Image URL" placeholder="https://..." value={image} onChangeText={setImage} />
          <InputField label="Description" placeholder="Enter product details..." value={description} onChangeText={setDescription} multiline numberOfLines={4} />

          <PrimaryButton title="Publish Product" onPress={handleSave} loading={loading} style={styles.saveBtn} />
        </View>
      </ScrollView>
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
  formCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveBtn: {
    marginTop: 12,
  },
});
