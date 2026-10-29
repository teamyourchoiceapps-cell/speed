import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UNITS = [
  { key: 'kmh',   label: 'km/h' },
  { key: 'mph',   label: 'mph' },
  { key: 'knots', label: 'knots' },
];

export default function UnitSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {UNITS.map((unit) => {
        const active = selected === unit.key;
        return (
          <TouchableOpacity
            key={unit.key}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onSelect(unit.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {unit.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: 4,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 26,
  },
  btnActive: {
    backgroundColor: '#00e5ff',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: '#0a0a1a',
  },
});
