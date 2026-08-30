import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import colors from '../../src/constants/colors';
import { AuthContext } from '../../src/context/AuthContext';
import { CartContext } from '../../src/context/CartContext';
import SearchBar from '../../src/components/SearchBar';
import CategoryCard from '../../src/components/CategoryCard';
import ProductCard from '../../src/components/ProductCard';
import AuthModal from '../../src/components/AuthModal';
import mockCategories from '../../src/data/categories';
import mockProducts from '../../src/data/products';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!user) {
      timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [user]);

  const featuredProducts = mockProducts.filter((p) => p.isFeatured);
  const latestProducts = mockProducts;

  // Responsive grid item width calculation
  const getGridItemWidth = () => {
    if (width >= 1100) return '25%'; // 4 columns on large desktop
    if (width >= 768) return '33.33%'; // 3 columns on tablet / desktop
    if (width <= 340) return '100%'; // 1 column on extra small screens
    return '50%'; // 2 columns default mobile
  };

  const gridItemWidth = getGridItemWidth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <AuthModal visible={showAuthModal} onClose={() => setShowAuthModal(false)} />

      {/* Header Wrapper */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <View style={styles.greetingBox}>
            <Text style={styles.greetingText}>Hello, {user ? user.name : 'Guest'} 👋</Text>
            <Text style={styles.subGreeting}>What are you looking for today?</Text>
          </View>
          <View style={styles.headerActions}>
            {!user && (
              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/modal')}>
              <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <SearchBar
          placeholder="Search products, brands..."
          editable={false}
          onPress={() => router.push('/search')}
          onFilterPress={() => router.push('/filter')}
        />

        {/* Banner Promo */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerBadge}>Special Offer</Text>
            <Text style={styles.bannerTitle}>Up to 50% OFF</Text>
            <Text style={styles.bannerSubtitle}>On selected tech & fashion essentials</Text>
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() => router.push('/product-list')}
            >
              <Text style={styles.bannerButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
          {width > 380 && (
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          )}
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => router.push('/categories')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {mockCategories.map((item) => (
            <CategoryCard
              key={item._id}
              category={item}
              isSelected={selectedCategory === item.name}
              onPress={() => {
                setSelectedCategory(item.name);
                router.push({ pathname: '/product-list', params: { category: item.name } });
              }}
            />
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products 🔥</Text>
          <TouchableOpacity onPress={() => router.push('/product-list')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              horizontal
              onPress={() => router.push({ pathname: '/product-details', params: { id: product._id } })}
            />
          ))}
        </ScrollView>

        {/* Latest Products Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Products ⚡</Text>
          <TouchableOpacity onPress={() => router.push('/product-list')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {latestProducts.map((product) => (
            <View key={product._id} style={[styles.gridItem, { width: gridItemWidth as any }]}>
              <ProductCard
                product={product}
                onPress={() => router.push({ pathname: '/product-details', params: { id: product._id } })}
                onAddToCart={() => addToCart(product, 1)}
              />
            </View>
          ))}
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
  headerWrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  greetingBox: {
    flex: 1,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signInBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  signInText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scrollContent: {
    paddingBottom: 24,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    minHeight: 150,
    borderRadius: 24,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  bannerContent: {
    flex: 1.25,
    padding: 18,
    justifyContent: 'center',
  },
  bannerBadge: {
    backgroundColor: colors.warning,
    color: colors.surface,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.surface,
    letterSpacing: -0.3,
  },
  bannerSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  bannerImage: {
    flex: 0.8,
    height: '100%',
    minWidth: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  categoriesList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  featuredList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  gridItem: {
    paddingHorizontal: 6,
  },
});
