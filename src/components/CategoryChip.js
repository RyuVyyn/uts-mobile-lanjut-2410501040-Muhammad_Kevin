import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export default function CategoryChip({ label = '', active = false, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 99,
    marginRight: 6,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#ff6b35',
    borderColor: '#ff6b35',
  },
  chipInactive: {
    backgroundColor: '#d5e5ef',
    borderColor: 'rgba(225,191,181,0.3)',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: '#ffffff',
  },
  labelInactive: {
    color: '#594139',
  },
});