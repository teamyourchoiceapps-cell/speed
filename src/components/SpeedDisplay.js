import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UNIT_LABELS = {
  kmh: 'km/h',
  mph: 'mph',
  knots: 'kn',
};

// Conversion from m/s
const convert = (mps, unit) => {
  if (mps === null || mps === undefined) return '--';
  switch (unit) {
    case 'kmh':   return (mps * 3.6).toFixed(1);
    case 'mph':   return (mps * 2.23694).toFixed(1);
    case 'knots': return (mps * 1.94384).toFixed(1);
    default:      return (mps * 3.6).toFixed(1);
  }
};

export default function SpeedDisplay({ speed, unit }) {
  const value = convert(speed, unit);
  const label = UNIT_LABELS[unit] || 'km/h';

  return (
    <View style={styles.container}>
      <Text style={styles.speedValue}>{value}</Text>
      <Text style={styles.unitLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedValue: {
    fontFamily: 'monospace',
    fontSize: 110,
    fontWeight: '200',
    color: '#00e5ff',
    letterSpacing: -4,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  unitLabel: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 6,
    marginTop: -10,
    textTransform: 'uppercase',
  },
});
