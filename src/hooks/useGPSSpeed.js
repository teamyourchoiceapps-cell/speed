import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

export default function useGPSSpeed(intervalSeconds = 1) {
  const [speed, setSpeed] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);
  const watchRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const requestPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }
        if (mounted) setHasPermission(true);
      } catch (e) {
        setError('Failed to get location permission');
      }
    };

    requestPermission();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!hasPermission) return;

    const startWatching = async () => {
      // Remove previous watcher
      if (watchRef.current) {
        watchRef.current.remove();
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: intervalSeconds * 1000,
          distanceInterval: 0,
        },
        (location) => {
          // speed is in m/s from expo-location
          const mps = location.coords.speed;
          setSpeed(mps !== null && mps >= 0 ? mps : 0);
        }
      );
    };

    startWatching();

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, [hasPermission, intervalSeconds]);

  return { speed, hasPermission, error };
}
