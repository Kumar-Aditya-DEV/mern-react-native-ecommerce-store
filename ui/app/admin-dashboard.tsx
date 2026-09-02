import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import colors from '../src/constants/colors';

export default function AdminDashboardScreen(): React.JSX.Element {
  const router = useRouter();

  const metrics = [
    { title: 'Total Revenue', value: '$12,450.00', icon: 'cash-outline', color: '#27AE60' },
    { title: 'Total Orders', value: '148', icon: 'bag-handle-outline', color: '#0060ac' },
    { title: 'Active Products', value: '45', icon: 'cube-outline', color: '#15157d' },
    { title: 'Total Customers', value: '312', icon: 'people-outline', color: '#F2994A' },
  ];

  const adminMenu = [
    { title: 'Manage Products', route: '/manage-products', icon: 'cube-outline' },
    { title: 'Manage Orders', route: '/manage-orders', icon: 'receipt-outline' },
    { title: 'Manage Categories', route: '/manage-categories', icon: 'pricetag-outline' },
    { title: 'Manage Users', route: '/manage-users', icon: 'people-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin Dashboard" showBack onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Metric Cards Grid */}
        <Text style={styles.sectionTitle}>Overview Statistics</Text>
        <View style={styles.metricsGrid}>
          {metrics.map((item, idx) => (
            <View key={idx} style={styles.metricCard}>
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricTitle}>{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Management Links */}
        <Text style={styles.sectionTitle}>Admin Controls</Text>
        {adminMenu.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuCard}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.8}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  metricTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  menuCard: {
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
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
