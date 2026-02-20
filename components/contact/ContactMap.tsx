'use client';

import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_CENTER: [number, number] = [35.743274, 51.405196];
const MAP_ZOOM = 16;
/** Slightly south of marker so the pin (which extends up) is fully visible and centered */
const MAP_VIEW_CENTER: [number, number] = [
	MAP_CENTER[0] - 0.001,
	MAP_CENTER[1],
];

/** Opens in Google Maps app on mobile or browser on desktop */
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_CENTER[0]},${MAP_CENTER[1]}`;

/** OpenStreetMap: no API key, works globally without VPN */
const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION =
	'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

/** Default marker icon: anchor at bottom-center (tip of pin) so marker is exactly on coordinates */
const defaultIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconRetinaUrl:
		'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [13, 41], // bottom-center of 25×41 so pin tip is on MAP_CENTER
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const tileLayerOptions = {
	minZoom: 0,
	maxZoom: 19,
	attribution: OSM_ATTRIBUTION,
};

export default function ContactMap() {
	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<L.Map | null>(null);
	const tileLayerRef = useRef<L.TileLayer | null>(null);

	// Create map once
	useEffect(() => {
		if (!containerRef.current) return;

		const map = L.map(containerRef.current, {
			center: MAP_VIEW_CENTER,
			zoom: MAP_ZOOM,
			scrollWheelZoom: true,
		});

		const initialLayer = L.tileLayer(OSM_TILE_URL, tileLayerOptions).addTo(map);
		tileLayerRef.current = initialLayer;

		L.marker(MAP_CENTER, { icon: defaultIcon }).addTo(map).bindPopup('اتراکس');

		map.setView(MAP_VIEW_CENTER, MAP_ZOOM);
		mapRef.current = map;
		return () => {
			tileLayerRef.current = null;
			map.remove();
			mapRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (!mapRef.current) return;

		tileLayerRef.current?.remove();
		const layer = L.tileLayer(OSM_TILE_URL, tileLayerOptions).addTo(
			mapRef.current,
		);
		tileLayerRef.current = layer;
	}, []);

	return (
		<div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
			<div
				ref={containerRef}
				className="w-full h-full min-h-[300px] rounded-xl"
				role="img"
				aria-hidden="true"
			/>
			<a
				href={MAP_LINK}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute inset-0 z-1000 cursor-pointer"
				aria-label="باز کردن آدرس در گوگل‌مپ یا اپلیکیشن نقشه"
			/>
		</div>
	);
}
