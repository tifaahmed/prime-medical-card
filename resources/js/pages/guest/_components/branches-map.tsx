import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {
    CircleMarker,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';

export type MapBranch = {
    id: number | string;
    name: string;
    address?: string;
    latitude: number | null;
    longitude: number | null;
};

const DEFAULT_COLOR = '#0b2e2c';
const ACTIVE_COLOR = '#d68228';

function pinIcon(color: string, scale = 1) {
    const size = 32 * scale;
    const html = `
        <svg viewBox="0 0 24 32" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
            <circle cx="12" cy="12" r="4.5" fill="white"/>
        </svg>`;

    return L.divIcon({
        className: 'pm-branch-pin',
        html,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
    });
}

function FitBounds({ points }: { points: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
        if (points.length === 0) {
            return;
        }
        if (points.length === 1) {
            map.setView(points[0], 14, { animate: false });
            return;
        }
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [40, 40] });
    }, [map, points]);

    return null;
}

type UserLocation = { lat: number; lng: number; accuracy?: number };

export default function BranchesMap({
    branches,
    activeId,
    onMarkerEnter,
    onMarkerLeave,
}: {
    branches: MapBranch[];
    activeId: MapBranch['id'] | null;
    onMarkerEnter?: (id: MapBranch['id']) => void;
    onMarkerLeave?: () => void;
}) {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locating, setLocating] = useState(false);
    const [locateError, setLocateError] = useState<string | null>(null);

    const handleLocateMe = () => {
        if (
            typeof navigator === 'undefined' ||
            !navigator.geolocation
        ) {
            setLocateError('المتصفح لا يدعم تحديد الموقع.');
            return;
        }
        setLocating(true);
        setLocateError(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
                setLocating(false);
            },
            (err) => {
                setLocating(false);
                setLocateError(
                    err.code === err.PERMISSION_DENIED
                        ? 'تم رفض إذن الموقع.'
                        : 'تعذّر تحديد الموقع.',
                );
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
        );
    };

    const branchPoints = branches
        .filter(
            (b): b is MapBranch & { latitude: number; longitude: number } =>
                typeof b.latitude === 'number' && typeof b.longitude === 'number',
        )
        .map((b) => [b.latitude, b.longitude] as [number, number]);

    if (branchPoints.length === 0) {
        return (
            <div className="grid aspect-[16/9] place-items-center rounded-2xl border border-dashed border-[rgba(11,46,44,0.15)] bg-white text-xs text-[var(--ink-soft)] sm:aspect-[2/1]">
                لا توجد إحداثيات للفروع لعرضها على الخريطة.
            </div>
        );
    }

    const fitPoints: [number, number][] = userLocation
        ? [...branchPoints, [userLocation.lat, userLocation.lng]]
        : branchPoints;
    const center = branchPoints[0];

    return (
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(11,46,44,0.08)] bg-white">
            <MapContainer
                center={center}
                zoom={11}
                scrollWheelZoom={false}
                className="aspect-[16/9] w-full sm:aspect-[2/1]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {branches.map((b) => {
                    if (
                        typeof b.latitude !== 'number' ||
                        typeof b.longitude !== 'number'
                    ) {
                        return null;
                    }
                    const active = activeId === b.id;
                    return (
                        <Marker
                            key={b.id}
                            position={[b.latitude, b.longitude]}
                            icon={pinIcon(
                                active ? ACTIVE_COLOR : DEFAULT_COLOR,
                                active ? 1.25 : 1,
                            )}
                            zIndexOffset={active ? 1000 : 0}
                            eventHandlers={{
                                mouseover: () => onMarkerEnter?.(b.id),
                                mouseout: () => onMarkerLeave?.(),
                            }}
                        >
                            <Popup>
                                <div className="text-xs" dir="rtl">
                                    <div className="font-bold text-[var(--teal-900)]">
                                        {b.name}
                                    </div>
                                    {b.address && (
                                        <div className="mt-1 text-[var(--ink-soft)]">
                                            {b.address}
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
                {userLocation && (
                    <>
                        {typeof userLocation.accuracy === 'number' && (
                            <CircleMarker
                                center={[userLocation.lat, userLocation.lng]}
                                radius={Math.min(
                                    40,
                                    Math.max(20, userLocation.accuracy / 5),
                                )}
                                pathOptions={{
                                    color: '#1d4ed8',
                                    fillColor: '#3b82f6',
                                    fillOpacity: 0.12,
                                    weight: 1,
                                }}
                            />
                        )}
                        <CircleMarker
                            center={[userLocation.lat, userLocation.lng]}
                            radius={8}
                            pathOptions={{
                                color: 'white',
                                fillColor: '#2563eb',
                                fillOpacity: 1,
                                weight: 3,
                            }}
                        >
                            <Popup>
                                <div className="text-xs" dir="rtl">
                                    <div className="font-bold text-[var(--teal-900)]">
                                        موقعك الحالي
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    </>
                )}
                <FitBounds points={fitPoints} />
            </MapContainer>
            <div className="absolute top-3 left-3 z-[400] flex flex-col items-start gap-1">
                <button
                    type="button"
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[var(--teal-900)] shadow-md backdrop-blur transition hover:bg-white disabled:opacity-60"
                >
                    <LocateIcon />
                    {locating
                        ? 'جارٍ تحديد الموقع...'
                        : userLocation
                          ? 'تحديث موقعي'
                          : 'إظهار موقعي'}
                </button>
                {locateError && (
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700 shadow-sm">
                        {locateError}
                    </span>
                )}
            </div>
        </div>
    );
}

function LocateIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
        >
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
    );
}
