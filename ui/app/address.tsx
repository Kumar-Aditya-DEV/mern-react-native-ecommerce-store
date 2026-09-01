import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../src/components/Header";
import PrimaryButton from "../src/components/PrimaryButton";
import colors from "../src/constants/colors";

const mockAddresses = [
  {
    _id: "a1",
    fullName: "Alex Johnson",
    phone: "+91 9876543210",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "OR",
    zipCode: "97477",
    country: "USA",
    isDefault: true,
  },
];

export default function AddressScreen(): React.JSX.Element {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Shipping Addresses"
        showBack
        onBackPress={() => router.back()}
      />

      <View style={styles.topAction}>
        <PrimaryButton
          title="+ Add New Address"
          onPress={() => router.push("/add-address")}
        />
      </View>

      <FlatList
        data={mockAddresses}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.fullName}</Text>
              {item.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>DEFAULT</Text>
                </View>
              )}
            </View>
            <Text style={styles.phone}>{item.phone}</Text>
            <Text style={styles.addressText}>
              {item.street}, {item.city}, {item.state} {item.zipCode},{" "}
              {item.country}
            </Text>
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
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },
  listContent: {
    padding: 16,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.primary,
  },
  phone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
});
