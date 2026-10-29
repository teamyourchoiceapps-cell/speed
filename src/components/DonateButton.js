import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';

// Replace this with your PayPal.me or donation link when ready
const DONATE_URL = 'https://paypal.me/yourpaypalhere';

export default function DonateButton() {
  const handlePress = () => {
    Linking.openURL(DONATE_URL);
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress} activeOpacity={0.8}>
      <Text style={styles.heart}>♥</Text>
      <Text style={styles.label}>Support YourSpeed</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 100, 130, 0.4)',
    backgroundColor: 'rgba(255, 100, 130, 0.07)',
  },
  heart: {
    color: '#ff6482',
    fontSize: 16,
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
