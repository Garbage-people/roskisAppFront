import { useEffect, useState, useMemo } from "react";

/**
 * Returns either the user position or a default position
 * @returns {{userPosition: {lat: number, lon: number}, isLocationEnabled: boolean}}
 */
const useLocation = () => {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null })
  const [isLocationEnabled, setLocationEnabled] = useState(false)
  const defaultPosition = useMemo(() => ({ lat: 60.1711, lon: 24.9414 }), []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          setLocationEnabled(true)
        },
        (error) => {
          console.error("Error getting location:", error)
          setUserPosition(defaultPosition)
          setLocationEnabled(false)
        }
      )
    } else {
      setUserPosition(defaultPosition)
      setLocationEnabled(false)
    }
  }, [])

  return {
    userPosition,
    isLocationEnabled
  }
}

export default useLocation