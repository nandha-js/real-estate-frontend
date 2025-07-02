import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FaMapMarkerAlt } from 'react-icons/fa'

const MapView = ({ properties, center, zoom = 13 }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView(
      [center.lat, center.lng], 
      zoom
    )

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.current)

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
      }
    }
  }, [center, zoom])

  useEffect(() => {
    if (!mapInstance.current || !properties.length) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    properties.forEach(property => {
      const marker = L.marker([property.latitude, property.longitude], {
        icon: L.divIcon({
          html: `<div class="text-red-600 text-2xl"><FaMapMarkerAlt /></div>`,
          className: 'bg-transparent border-none'
        })
      }).addTo(mapInstance.current)

      marker.bindPopup(`
        <div class="w-48">
          <img src="${property.images[0] || '/placeholder-property.jpg'}" alt="${property.title}" class="w-full h-24 object-cover mb-2">
          <h4 class="font-bold">${property.title}</h4>
          <p class="text-sm">$${property.price.toLocaleString()}</p>
          <a href="/properties/${property.id}" class="text-blue-600 text-sm hover:underline">View details</a>
        </div>
      `)

      markersRef.current.push(marker)
    })

    // Fit map to bounds if there are properties
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