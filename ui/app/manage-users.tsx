import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../src/components/Header';
import colors from '../src/constants/colors';

const mockUsers = [
  { _id: 'u1', name: 'Alex Johnson', email: 'alex@example.com', role: 'user' },
  { _id: 'u2', name: 'Admin User', email: 'admin@shopverse.com', role: 'admin' },
  { _id: 'u3', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'user' },
];

export default function ManageUsersScreen(): React.JSX.Element {
  const router = useRouter();

  const handleToggleRole = (name: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    Alert.alert('Change Role', `Change role of ${name} to ${newRole}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => Alert.alert('Updated', `User role changed to ${newRole}`) }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Users" showBack onBackPress={() => router.back()} />

      <FlatList
        data={mockUsers}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity
              style={[styles.badge, item.role === 'admin' && styles.adminBadge]}
              onPress={() => handleToggleRole(item.name, item.role)}
            >
              <Text style={[styles.badgeText, item.role === 'admin' && styles.adminBadgeText]}>
                {item.role.toUpperCase()}
              </Text>
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
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  adminBadge: {
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  adminBadgeText: {
    color: colors.primary,
  },
});
