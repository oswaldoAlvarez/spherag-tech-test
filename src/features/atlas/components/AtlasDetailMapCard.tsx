import { useMemo, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import type { Region } from 'react-native-maps';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { MapZoomControls } from './MapZoomControls';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasDetailMapCardProps = {
  latitude: number | null;
  longitude: number | null;
  title: string;
};

const INITIAL_LATITUDE_DELTA = 0.02;
const INITIAL_LONGITUDE_DELTA = 0.02;
const ZOOM_FACTOR = 0.55;
const MIN_DELTA = 0.0015;
const MAX_DELTA = 6;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill,
  },
});

export const AtlasDetailMapCard = ({
  latitude,
  longitude,
  title,
}: AtlasDetailMapCardProps) => {
  const hasCoordinates = latitude !== null && longitude !== null;
  const latitudeValue = latitude ?? 0;
  const longitudeValue = longitude ?? 0;
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: latitudeValue,
    latitudeDelta: INITIAL_LATITUDE_DELTA,
    longitude: longitudeValue,
    longitudeDelta: INITIAL_LONGITUDE_DELTA,
  });
  const openStreetMapHtml = useMemo(
    () =>
      getOpenStreetMapHtml({
        latitude: latitudeValue,
        longitude: longitudeValue,
        title,
      }),
    [latitudeValue, longitudeValue, title]
  );

  const updateZoom = (direction: 'in' | 'out') => {
    const multiplier = direction === 'in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
    const nextRegion = {
      ...region,
      latitudeDelta: clamp(
        region.latitudeDelta * multiplier,
        MIN_DELTA,
        MAX_DELTA
      ),
      longitudeDelta: clamp(
        region.longitudeDelta * multiplier,
        MIN_DELTA,
        MAX_DELTA
      ),
    };

    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 180);
  };

  if (!hasCoordinates) {
    return (
      <FeedbackCard
        message="Este Atlas no tiene coordenadas válidas para mostrar en el mapa."
        title="Ubicación no disponible"
      />
    );
  }

  return (
    <SurfaceCard className="mt-6 px-0 py-0">
      <TextView className="px-5 pt-5" variant="button">
        Ubicacion
      </TextView>
      <TextView className="px-5 pt-2" tone="secondary" variant="caption">
        Vista aproximada del Atlas en el mapa.
      </TextView>

      <View className="mx-5 mt-5 h-[240px] overflow-hidden rounded-[24px]">
        {Platform.OS === 'android' ? (
          <WebView
            originWhitelist={['*']}
            scrollEnabled={false}
            source={{ html: openStreetMapHtml }}
            style={styles.map}
          />
        ) : (
          <>
            <MapView
              initialRegion={region}
              onRegionChangeComplete={setRegion}
              ref={mapRef}
              style={styles.map}
            >
              <Marker
                coordinate={{
                  latitude: latitudeValue,
                  longitude: longitudeValue,
                }}
                description={`Lat ${latitudeValue}, Lng ${longitudeValue}`}
                title={title}
              />
            </MapView>

            <MapZoomControls
              onZoomIn={() => updateZoom('in')}
              onZoomOut={() => updateZoom('out')}
            />
          </>
        )}
      </View>

      <TextView className="px-5 pb-5 pt-4" tone="secondary" variant="caption">
        {`Lat ${latitudeValue.toFixed(5)} · Lng ${longitudeValue.toFixed(5)}`}
      </TextView>
    </SurfaceCard>
  );
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const getOpenStreetMapHtml = ({
  latitude,
  longitude,
  title,
}: {
  latitude: number;
  longitude: number;
  title: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <style>
      html, body, #map {
        height: 100%;
        margin: 0;
        padding: 0;
        background: #0e1412;
      }
      .leaflet-control-zoom a {
        background: rgba(8, 12, 10, 0.82);
        color: #f3f5f4;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }
      .leaflet-popup-content-wrapper,
      .leaflet-popup-tip {
        background: #111715;
        color: #f3f5f4;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>
    <script>
      const map = L.map('map', { zoomControl: true }).setView([${latitude}, ${longitude}], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      L.marker([${latitude}, ${longitude}]).addTo(map).bindPopup(${JSON.stringify(title)}).openPopup();
    </script>
  </body>
</html>`;
