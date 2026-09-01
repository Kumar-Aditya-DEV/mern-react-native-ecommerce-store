import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import InputField from '../src/components/InputField';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import { customAlert } from '../src/utils/alert';

export default function AddAddressScreen(): React.JSX.Element {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!fullName || !phone || !street || !city) {
      customAlert('Validation Error', 'Please complete all address fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      customAlert('Address Saved ✅', 'Your delivery address has been saved.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add New Address" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formCard}>
          <InputField label="Full Name" placeholder="Alex Johnson" value={fullName} onChangeText={setFullName} />
          <InputField label="Phone Number" placeholder="+91 9876543210" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <InputField label="Street Address" placeholder="742 Evergreen Terrace" value={street} onChangeText={setStreet} />
          <InputField label="City" placeholder="Springfield" value={city} onChangeText={setCity} />
          <InputField label="State" placeholder="OR" value={state} onChangeText={setState} />
          <InputField label="ZIP Code" placeholder="97477" value={zipCode} onChangeText={setZipCode} keyboardType="numeric" />

          <PrimaryButton title="Save Address" onPress={handleSave} loading={loading} style={styles.saveBtn} />
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
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
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
