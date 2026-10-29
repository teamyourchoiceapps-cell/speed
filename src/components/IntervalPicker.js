import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const INTERVALS = [
  { value: 1,  label: '1s' },
  { value: 2,  label: '2s' },
  { value: 5,  label: '5s' },
  { value: 10, label: '10s' },
];

export default function IntervalPicker({ selected, onSelect }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>UPDATE INTERVAL</Text>
      <View style={styles.container}>
        {INTERVALS.map((item) => {
          const active = selected === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.btn, active && styles.btnActive]}
              onPress={() => onSelect(item.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.label, active && styles.labelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 4,
    gap: 2,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  btnActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#00e5ff',
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontWeight: '600',
  },
  labelActive: {
    color: '#00e5ff',
  },
});
