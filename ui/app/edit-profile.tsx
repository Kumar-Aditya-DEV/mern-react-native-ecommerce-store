import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import InputField from '../src/components/InputField';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import { AuthContext } from '../src/context/AuthContext';
import { customAlert } from '../src/utils/alert';

export default function EditProfileScreen(): React.JSX.Element {
  const router = useRouter();
  const { user, updateUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 9876543210');
  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop'
  );
  const [loading, setLoading] = useState(false);

  const handleChangePhoto = () => {
    customAlert('Change Profile Photo 📸', 'Choose photo source:', [
      {
        text: 'Camera',
        onPress: () =>
          setAvatar('https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop')
      },
      {
        text: 'Gallery',
        onPress: () =>
          setAvatar('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop')
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      customAlert('Validation Error', 'Name cannot be empty.');
      return;
    }

    setLoading(true);
    await updateUser({ name, email, phone, avatar });
    setLoading(false);

    customAlert('Profile Updated ✅', 'Your changes have been saved successfully.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Edit Profile" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBtn} onPress={handleChangePhoto}>
              <Ionicons name="camera" size={18} color={colors.surface} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleChangePhoto}>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            icon="person-outline"
          />

          <InputField
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail-outline"
          />

          <InputField
            label="Phone Number"
            placeholder="+91 9876543210"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="call-outline"
          />

          <PrimaryButton
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            style={styles.saveBtn}
          />
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
  avatarSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  changePhotoText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
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
