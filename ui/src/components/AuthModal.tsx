import React, { useState, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InputField from './InputField';
import PrimaryButton from './PrimaryButton';
import colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';
import { customAlert } from '../utils/alert';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: AuthModalProps): React.JSX.Element {
  const { login } = useContext(AuthContext);
  const [isRegisterTab, setIsRegisterTab] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      customAlert('Validation Error', 'Please enter email and password.');
      return;
    }

    if (isRegisterTab && !name.trim()) {
      customAlert('Validation Error', 'Please enter your full name.');
      return;
    }

    setLoading(true);

    const userName = isRegisterTab ? name.trim() : email.split('@')[0] || 'User';

    const userRole = email.includes('admin') ? 'admin' : 'user';

    const dummyUser = {
      _id: `usr-${Date.now()}`,
      name: userName,
      email: email.trim(),
      role: userRole as 'admin' | 'user',
    };

    setTimeout(async () => {
      await login(dummyUser, 'jwt-token-auth-modal');
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardContainer}
          >
            <View style={styles.modalContainer}>
              {/* Close Button */}
              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Header */}
                <View style={styles.header}>
                  <View style={styles.logoBadge}>
                    <Ionicons name="bag-handle" size={28} color={colors.primary} />
                  </View>
                  <Text style={styles.title}>Welcome to ShopVerse</Text>
                  <Text style={styles.subtitle}>
                    {isRegisterTab ? 'Create an account to start shopping' : 'Sign in to access your orders & wishlist'}
                  </Text>
                </View>

                {/* Tab Switches */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[styles.tabBtn, !isRegisterTab && styles.activeTabBtn]}
                    onPress={() => setIsRegisterTab(false)}
                  >
                    <Text style={[styles.tabText, !isRegisterTab && styles.activeTabText]}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabBtn, isRegisterTab && styles.activeTabBtn]}
                    onPress={() => setIsRegisterTab(true)}
                  >
                    <Text style={[styles.tabText, isRegisterTab && styles.activeTabText]}>
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Inputs */}
                {isRegisterTab && (
                  <InputField
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    icon="person-outline"
                  />
                )}

                <InputField
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  icon="mail-outline"
                />

                <InputField
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                  icon="lock-closed-outline"
                />

                {/* Action Button */}
                <PrimaryButton
                  title={isRegisterTab ? 'Create Account' : 'Sign In'}
                  onPress={handleAuth}
                  loading={loading}
                  style={styles.submitBtn}
                />

                {/* Skip Link */}
                <TouchableOpacity style={styles.skipBtn} onPress={onClose}>
                  <Text style={styles.skipText}>Continue as Guest</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  keyboardContainer: {
    width: '100%',
    maxWidth: 440,
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    maxHeight: '90%',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTabBtn: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '800',
  },
  submitBtn: {
    marginTop: 12,
  },
  skipBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
