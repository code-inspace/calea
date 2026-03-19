import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { getPrimaryHex } from '../config/colors';

const LAT = 43.2681;
const LNG = 6.6400;
const ZOOM = 13;

export default function ResortMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    import('leaflet').then((L) => {
      const map = L.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapRef.current = map;

      // CartoDB Positron — tuiles claires, base idéale pour le filtre
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      ).addTo(map);

      // Grayscale + assombrissement sur le tile pane
      // Le mix-blend-mode: color de l'overlay imposera ensuite le hue exact ${getPrimaryHex()}
      // → terres : vert clair, routes : vert moyen, eau : vert foncé (${getPrimaryHex()})
      function applyStyle() {
        const tilePane = containerRef.current?.querySelector('.leaflet-tile-pane');
        if (!tilePane) return;

        tilePane.style.filter = 'grayscale(1) brightness(0.52) contrast(1.35)';

        // Overlay couleur : impose le hue + saturation de ${getPrimaryHex()} sur chaque pixel
        // mais conserve la luminosité relative → dégradé naturel de vert
        if (!containerRef.current.querySelector('.map-color-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'map-color-overlay';
          Object.assign(overlay.style, {
            position: 'absolute',
            inset: '0',
            // couleur plus saturée sur le même hue (146°) pour un rendu vivant
            background: 'hsl(146, 55%, 22%)',
            mixBlendMode: 'color',
            pointerEvents: 'none',
            zIndex: '350',
          });
          containerRef.current.appendChild(overlay);
        }
      }

      map.on('load', applyStyle);
      setTimeout(applyStyle, 80);

      // Marqueur : dot crème sur fond vert foncé brand
      const markerIcon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative;width:52px;height:52px;display:flex;align-items:center;justify-content:center;">
            <span style="
              position:absolute;inset:0;
              border-radius:50%;
              background:rgba(26,47,35,0.12);
              border:1px solid rgba(26,47,35,0.3);
              animation:mping 2s cubic-bezier(0,0,0.2,1) infinite;
            "></span>
            <span style="
              width:18px;height:18px;
              border-radius:50%;
              background:${getPrimaryHex()};
              border:2.5px solid #FDFCF8;
              box-shadow:0 2px 12px rgba(26,47,35,0.4);
              display:block;
            "></span>
          </div>
          <style>@keyframes mping{75%,100%{transform:scale(2.2);opacity:0}}</style>
        `,
        iconSize: [52, 52],
        iconAnchor: [26, 26],
      });

      const marker = L.marker([LAT, LNG], { icon: markerIcon }).addTo(map);

      marker.bindPopup(
        `<div style="
          font-family:'Inter',sans-serif;
          font-size:10px;
          letter-spacing:0.25em;
          text-transform:uppercase;
          color:${getPrimaryHex()};
          padding:7px 14px;
          white-space:nowrap;
          background:#FDFCF8;
        ">Domaine de Caléa</div>`,
        { closeButton: false, offset: [0, -22], className: 'calea-popup' }
      ).openPopup();

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.control
        .attribution({ position: 'bottomleft', prefix: false })
        .addTo(map)
        .setPrefix('© <a href="https://carto.com" style="color:rgba(26,47,35,0.35)">CartoDB</a>');
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        minHeight: '400px',
        background: getPrimaryHex(),
        isolation: 'isolate', // confine le blend mode aux enfants de la carte
      }}
    />
  );
}
