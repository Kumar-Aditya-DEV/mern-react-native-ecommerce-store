import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputProps, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  error,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => inputRef.current?.focus()}
        style={[styles.inputWrapper, error ? styles.inputError : null]}
      >
        {icon && (
          <Ionicons name={icon} size={20} color={colors.textSecondary} style={styles.leftIcon} />
        )}

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: 12,
    height: 48,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 0,
    outlineWidth: 0,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  eyeBtn: {
    padding: 6,
  },
  errorText: {
    fontSize: 11,
    color: colors.error,
    marginTop: 4,
  },
});

export default InputField;
