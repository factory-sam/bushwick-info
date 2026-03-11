"use client";

import type { Place } from "@/data/places";
import { CATEGORIES } from "@/data/places";

export interface TargetingReticleProps {
  place: Place;
  color: string;
  isLocking: boolean;
}

/**
 * Cyberpunk targeting reticle that appears around markers.
 * On hover: animated concentric brackets with rotation.
 * On click (locking): brackets close in tightly with text flash.
 */
export function TargetingReticle({ place, color, isLocking }: TargetingReticleProps) {
  const categoryInfo = CATEGORIES[place.category];

  return (
    <div
      className="pointer-events-none absolute"
      style={{ width: "120px", height: "120px" }}
      data-testid="targeting-reticle"
    >
      {/* Outer rotating ring — octagonal brackets */}
      <svg
        className={isLocking ? "reticle-bracket-lock" : "reticle-ring-outer"}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Octagonal outer ring */}
        <polygon
          points="60,5 85,15 105,35 115,60 105,85 85,105 60,115 35,105 15,85 5,60 15,35 35,15"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Corner bracket marks */}
        <line x1="20" y1="20" x2="35" y2="20" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="20" y1="20" x2="20" y2="35" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="100" y1="20" x2="85" y2="20" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="100" y1="20" x2="100" y2="35" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="100" y1="100" x2="85" y2="100" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="100" y1="100" x2="100" y2="85" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="20" y1="100" x2="35" y2="100" stroke={color} strokeWidth="2" opacity="0.9" />
        <line x1="20" y1="100" x2="20" y2="85" stroke={color} strokeWidth="2" opacity="0.9" />
      </svg>

      {/* Inner counter-rotating ring */}
      <svg
        className={isLocking ? "reticle-bracket-lock" : "reticle-ring-inner"}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Inner hexagonal ring */}
        <polygon
          points="60,25 82,35 95,57 82,85 60,95 38,85 25,57 38,35"
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          opacity="0.4"
          strokeDasharray="4 2"
        />
        {/* Crosshair lines */}
        <line x1="60" y1="30" x2="60" y2="45" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="60" y1="75" x2="60" y2="90" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="60" x2="45" y2="60" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="75" y1="60" x2="90" y2="60" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Animated bracket entry */}
      <svg
        className="reticle-bracket-enter"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Small diamond at center */}
        <polygon
          points="60,52 68,60 60,68 52,60"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      {/* Data readout text — place name and category */}
      <div
        className="reticle-data-text absolute font-mono"
        style={{
          left: "100%",
          top: "10px",
          marginLeft: "8px",
          whiteSpace: "nowrap",
          color,
          textShadow: `0 0 7px ${color}, 0 0 10px ${color}`,
          fontSize: "10px",
          lineHeight: "1.4",
          letterSpacing: "0.05em",
        }}
      >
        <div className="uppercase">{place.name}</div>
        <div style={{ opacity: 0.7, fontSize: "9px" }}>[{categoryInfo.name.toUpperCase()}]</div>
      </div>

      {/* Lock-on flash text — "TARGET ACQUIRED" */}
      {isLocking && (
        <div className="lock-on-flash absolute inset-0 flex items-center justify-center">
          <div
            className="font-mono text-xs font-bold uppercase tracking-widest"
            style={{
              color,
              textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
              fontSize: "8px",
              letterSpacing: "0.2em",
            }}
          >
            TARGET LOCKED
          </div>
        </div>
      )}
    </div>
  );
}
