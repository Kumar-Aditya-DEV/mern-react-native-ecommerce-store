import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../src/components/InputField';
import PrimaryButton from '../src/components/PrimaryButton';
import colors from '../src/constants/colors';
import { AuthContext } from '../src/context/AuthContext';

export default function LoginScreen(): React.JSX.Element {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const dummyUser = {
      _id: 'usr-1',
      name: email.split('@')[0] || 'User',
      email: email,
      role: (email.includes('admin') ? 'admin' : 'user') as 'admin' | 'user',
    };

    await login(dummyUser, 'dummy-token-abc');
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Ionicons name="bag-handle" size={32} color={colors.primary} />
          </View>
          <Text style={styles.appName}>ShopVerse</Text>
          <Text style={styles.subTitle}>Sign in to your account</Text>
        </View>

        <View style={styles.formCard}>
          <InputField
            label="Email Address"
            placeholder="enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon="mail-outline"
          />

          <InputField
            label="Password"
            placeholder="enter password"
            value={password}
            onChangeText={setPassword}
            isPassword
            icon="lock-closed-outline"
          />

          <PrimaryButton
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.guestLinkContainer}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.guestLinkText}>Continue as Guest →</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
  },
  subTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loginBtn: {
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  guestLinkContainer: {
    alignItems: 'center',
    marginTop: 18,
  },
  guestLinkText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
