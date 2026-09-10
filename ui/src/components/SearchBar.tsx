import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  onPress?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onPress,
  onFilterPress,
  placeholder = 'Search products...',
  editable = true,
  autoFocus = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.searchBox}
        onPress={onPress}
        activeOpacity={editable ? 1 : 0.8}
      >
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          autoFocus={autoFocus}
          pointerEvents={editable ? 'auto' : 'none'}
        />
        {value ? (
          <TouchableOpacity onPress={onClear}>
            <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>

      {onFilterPress && (
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default SearchBar;
