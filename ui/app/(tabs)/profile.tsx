import React, { useContext } from 'react';
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
import colors from '../../src/constants/colors';
import { AuthContext } from '../../src/context/AuthContext';
import { customAlert } from '../../src/utils/alert';

export default function ProfileTabScreen(): React.JSX.Element {
  const router = useRouter();
  const { user, logout, isAdmin, switchRole } = useContext(AuthContext);

  const handleLogout = () => {
    customAlert('Sign Out', 'Are you sure you want to sign out of ShopVerse?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        }
      }
    ]);
  };

  const handleItemPress = (route: string, isProtected: boolean = true) => {
    if (isProtected && !user) {
      customAlert(
        'Authentication Required',
        'Please sign in to access this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => router.push('/login') }
        ]
      );
      return;
    }
    router.push(route as any);
  };

  const menuSections = [
    {
      title: 'General',
      items: [
        { icon: 'person-outline', label: 'Edit Profile', route: '/edit-profile', protected: true },
        { icon: 'location-outline', label: 'Shipping Addresses', route: '/address', protected: true },
        { icon: 'bag-handle-outline', label: 'My Orders', route: '/orders', protected: true },
        { icon: 'heart-outline', label: 'Saved Wishlist', route: '/(tabs)/wishlist', protected: false },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'notifications-outline', label: 'Push Notifications', route: '/modal', protected: false },
        { icon: 'shield-checkmark-outline', label: 'Security & Privacy', route: '/modal', protected: false },
      ]
    }
  ];

  if (user && isAdmin) {
    menuSections.unshift({
      title: 'Admin Operations',
      items: [
        { icon: 'grid-outline', label: 'Admin Dashboard', route: '/admin-dashboard', protected: true },
        { icon: 'cube-outline', label: 'Manage Products', route: '/manage-products', protected: true },
        { icon: 'receipt-outline', label: 'Manage Orders', route: '/manage-orders', protected: true },
        { icon: 'pricetag-outline', label: 'Manage Categories', route: '/manage-categories', protected: true },
        { icon: 'people-outline', label: 'Manage Users', route: '/manage-users', protected: true },
      ]
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card Header */}
        {user ? (
          <View style={styles.headerCard}>
            <Image
              source={{ uri: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>{isAdmin ? 'Admin Mode' : 'Customer Account'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/edit-profile')}>
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerCard}>
            <View style={[styles.avatar, styles.guestAvatar]}>
              <Ionicons name="person" size={32} color={colors.primary} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Guest Account</Text>
              <Text style={styles.userEmail}>Sign in to save orders & preferences</Text>
              <View style={styles.guestActionRow}>
                <TouchableOpacity
                  style={styles.guestLoginBtn}
                  onPress={() => router.push('/login')}
                >
                  <Text style={styles.guestLoginText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.guestRegBtn}
                  onPress={() => router.push('/register')}
                >
                  <Text style={styles.guestRegText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Role Switching Banner */}
        {user && (
          <TouchableOpacity style={styles.roleBanner} onPress={switchRole} activeOpacity={0.8}>
            <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
            <Text style={styles.roleBannerText}>
              Switch to {isAdmin ? 'User Mode' : 'Admin Panel'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Menu Sections */}
        {menuSections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuGroup}>
              {section.items.map((item, itemIdx) => (
                <TouchableOpacity
                  key={itemIdx}
                  style={[
                    styles.menuItem,
                    itemIdx === section.items.length - 1 && styles.noBorder
                  ]}
                  onPress={() => handleItemPress(item.route, item.protected)}
                >
                  <View style={styles.menuLeft}>
                    <View style={styles.menuIconBox}>
                      <Ionicons name={item.icon as any} size={20} color={colors.primary} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout / Login Button */}
        {user ? (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={styles.logoutText}>Sign Out Account</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginCardBtn}
            onPress={() => router.push('/login')}
            activeOpacity={0.8}
          >
            <Ionicons name="log-in-outline" size={20} color={colors.primary} />
            <Text style={styles.loginCardText}>Sign In to Account</Text>
          </TouchableOpacity>
        )}
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
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  userInfo: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  roleBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 12,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  roleBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  menuGroup: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 8,
  },
  guestAvatar: {
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestActionRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  guestLoginBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  guestLoginText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  guestRegBtn: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  guestRegText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  loginCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  loginCardText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
});
