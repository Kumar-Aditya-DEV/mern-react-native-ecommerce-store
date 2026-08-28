const colors = {
  primary: '#4F46E5', // Indigo 600
  primaryContainer: '#4338CA', // Indigo 700
  primaryLight: '#EEF2FF', // Indigo 50
  secondary: '#0EA5E9', // Sky 500
  secondaryContainer: '#38BDF8', // Sky 400
  background: '#F8FAFC', // Slate 50
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9', // Slate 100
  surfaceVariant: '#E2E8F0', // Slate 200
  textPrimary: '#0F172A', // Slate 900
  textSecondary: '#475569', // Slate 600
  textMuted: '#94A3B8', // Slate 400
  border: '#E2E8F0', // Slate 200
  borderDark: '#CBD5E1', // Slate 300
  success: '#10B981', // Emerald 500
  successLight: '#ECFDF5', // Emerald 50
  warning: '#F59E0B', // Amber 500
  warningLight: '#FFFBEB', // Amber 50
  error: '#EF4444', // Red 500
  errorLight: '#FEF2F2', // Red 50
  star: '#F59E0B',
  cardShadow: 'rgba(79, 70, 229, 0.08)',
  overlay: 'rgba(15, 23, 42, 0.5)',
} as const;

export type Colors = typeof colors;
export default colors;

