import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapView = ({ properties = [], center = { lat: 0, lng: 0 }, zoom = 13 }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])

  // Init map once
  useEffect(() => {
    if (!mapRef.current) return

    mapInstance.current = L.map(mapRef.current).setView([center.lat, center.lng], zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current)

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
      }
    }
  }, [center, zoom])

  // Handle markers update
  useEffect(() => {
    if (!mapInstance.current || !properties.length) return

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    properties.forEach((property) => {
      const marker = L.marker([property.latitude, property.longitude], {
        icon: L.divIcon({
          html: `<div style="color: red; font-size: 24px;">📍</div>`,
          className: 'leaflet-marker-icon',
          iconSize: [24, 24],
          iconAnchor: [12, 24]
        })
      }).addTo(mapInstance.current)

      marker.bindPopup(`
        <div style="width: 200px">
          <img src="${property.images?.[0] || '/placeholder-property.jpg'}" alt="${property.title}" style="width: 100%; height: 100px; object-fit: cover; margin-bottom: 8px;" />
          <strong>${property.title}</strong>
          <p>$${property.price?.toLocaleString()}</p>
          <a href="/properties/${property._id}" style="color: #2563eb; text-decoration: underline;">View details</a>
        </div>
      `)

      markersRef.current.push(marker)
    })

    // Fit bounds
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map(p => [p.latitude, p.longitude]))
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [properties])

  return (
    <div
      ref={mapRef}
      className="w-full h-96 rounded-lg shadow-md"
      style={{ minHeight: '400px' }}
    />
  )
}

export default MapView
