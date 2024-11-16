import { useEffect } from 'react';
import { useLocation } from '@remix-run/react';

export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname);
  }, [location]);

  const trackEvent = (eventName, properties = {}) => {
    // Implementation for tracking custom events
    console.log(`Event tracked: ${eventName}`, properties);
  };

  const trackPageView = (path) => {
    // Implementation for tracking page views
    console.log(`Page view: ${path}`);
  };

  return { trackEvent };
} 