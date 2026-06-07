import React from 'react';

/**
 * ParticleBackground - Stub component for the animated background.
 * Returns a transparent layer so it does not block the moving background rendered behind it.
 */
export default function ParticleBackground() {
  return (
    <div 
      className="fixed inset-0 -z-10 pointer-events-none bg-transparent" 
      aria-hidden="true"
    />
  );
}
