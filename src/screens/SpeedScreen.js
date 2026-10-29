import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGPSSpeed from '../hooks/useGPSSpeed';
import SpeedDisplay from '../components/SpeedDisplay';
import UnitSelector from '../components/UnitSelector';
import IntervalPicker from '../components/IntervalPicker';
import DonateButton from '../components/DonateButton';

const STORAGE_KEY_UNIT     = '@yourspeed_unit';
const STORAGE_KEY_INTERVAL = '@yourspeed_interval';
const STORAGE_KEY_ADS      = '@yourspeed_ads';

export default function SpeedScreen() {
  const [unit, setUnit]         = useState('kmh');
  const [interval, setInterval] = useState(1);
  const [showAds, setShowAds]   = useState(false);
  const [loaded, setLoaded]     = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { speed, hasPermission, error } = useGPSSpeed(interval);

  // Pulse animation for the speed dot
  const pulse = new Animated.Value(1);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Load saved preferences
  useEffect(() => {
    const load = async () => {
      try {
        const savedUnit     = await AsyncStorage.getItem(STORAGE_KEY_UNIT);
        const savedInterval = await AsyncStorage.getItem(STORAGE_KEY_INTERVAL);
        const savedAds      = await AsyncStorage.getItem(STORAGE_KEY_ADS);
        if (savedUnit)     setUnit(savedUnit);
        if (savedInterval) setInterval(Number(savedInterval));
        if (savedAds)      setShowAds(savedAds === 'true');
      } catch (_) {}
      setLoaded(true);
    };
    load();
  }, []);

  // Save preferences on change
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY_UNIT, unit);
  }, [unit, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY_INTERVAL, String(interval));
  }, [interval, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY_ADS, String(showAds));
  }, [showAds, loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a1a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>YOUR<Text style={styles.appNameAccent}>SPEED</Text></Text>
        <View style={styles.headerRight}>
          <Animated.View style={[styles.dot, hasPermission && styles.dotActive, { transform: [{ scale: pulse }] }]} />
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => setShowSettings(!showSettings)}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsIcon}>{showSettings ? '✕' : '⚙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main speed area */}
      <View style={styles.speedArea}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <SpeedDisplay speed={speed} unit={unit} />
        )}
      </View>

      {/* Unit selector */}
      <View style={styles.unitRow}>
        <UnitSelector selected={unit} onSelect={setUnit} />
      </View>

      {/* Settings panel */}
      {showSettings && (
        <View style={styles.settingsPanel}>
          <IntervalPicker selected={interval} onSelect={setInterval} />

          <View style={styles.divider} />

          {/* Ads toggle */}
          <TouchableOpacity
            style={styles.adsToggle}
            onPress={() => setShowAds(!showAds)}
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.adsToggleLabel}>Show Ads</Text>
              <Text style={styles.adsToggleSub}>Help keep YourSpeed free</Text>
            </View>
            <View style={[styles.toggleTrack, showAds && styles.toggleTrackOn]}>
              <View style={[styles.toggleThumb, showAds && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <DonateButton />
        </View>
      )}

      {/* Ad banner placeholder — shown when ads are on */}
      {showAds && (
        <View style={styles.adBanner}>
          <Text style={styles.adText}>📢 Ad space — AdMob coming soon</Text>
        </View>
      )}

      {/* Footer */}
      {!showSettings && (
        <View style={styles.footer}>
          <DonateButton />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 3,
  },
  appNameAccent: {
    color: '#00e5ff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: '#00ff88',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
  },
  speedArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#ff6482',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  unitRow: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  settingsPanel: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    padding: 24,
    gap: 20,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    width: '100%',
  },
  adsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  adsToggleLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    fontWeight: '600',
  },
  adsToggleSub: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    marginTop: 2,
  },
  toggleTrack: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    padding: 3,
  },
  toggleTrackOn: {
    backgroundColor: 'rgba(0, 229, 255, 0.25)',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  toggleThumbOn: {
    backgroundColor: '#00e5ff',
    alignSelf: 'flex-end',
  },
  adBanner: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 28,
    paddingTop: 8,
  },
});
