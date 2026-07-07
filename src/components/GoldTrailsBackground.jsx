import React from 'react';

// Fixed positions for orbs — stable across renders (no Math.random in render)
const orbs = [
  { w: 700, h: 700, top: '-5%',  left: '-10%', dur: '20s', delay: '0s',   opacity: 0.55 },
  { w: 600, h: 600, top: '40%',  left: '65%',  dur: '25s', delay: '-7s',  opacity: 0.45 },
  { w: 800, h: 800, top: '70%',  left: '15%',  dur: '28s', delay: '-12s', opacity: 0.40 },
  { w: 500, h: 500, top: '5%',   left: '55%',  dur: '22s', delay: '-4s',  opacity: 0.50 },
  { w: 600, h: 600, top: '30%',  left: '-8%',  dur: '26s', delay: '-9s',  opacity: 0.40 },
  { w: 450, h: 450, top: '82%',  left: '72%',  dur: '18s', delay: '-3s',  opacity: 0.45 },
];

// Fixed sparkle positions
const sparks = [
  { top: '8%',  left: '11%',  size: 6, dur: '6s',  delay: '0s'    },
  { top: '15%', left: '48%',  size: 4, dur: '8s',  delay: '-1.3s' },
  { top: '23%', left: '85%',  size: 6, dur: '10s', delay: '-2.6s' },
  { top: '31%', left: '22%',  size: 5, dur: '7s',  delay: '-3.9s' },
  { top: '38%', left: '59%',  size: 4, dur: '9s',  delay: '-5.2s' },
  { top: '46%', left: '96%',  size: 6, dur: '6s',  delay: '-6.5s' },
  { top: '53%', left: '33%',  size: 5, dur: '8s',  delay: '-7.8s' },
  { top: '61%', left: '70%',  size: 4, dur: '10s', delay: '-9.1s' },
  { top: '68%', left: '7%',   size: 6, dur: '7s',  delay: '-10.4s'},
  { top: '76%', left: '44%',  size: 5, dur: '9s',  delay: '-11.7s'},
  { top: '83%', left: '81%',  size: 4, dur: '6s',  delay: '-13s'  },
  { top: '91%', left: '18%',  size: 6, dur: '8s',  delay: '-14.3s'},
];

const GoldTrailsBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* Large glowing orbs — mix-blend-mode:screen lets them show THROUGH any bg */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full gold-orb-float"
          style={{
            width:  orb.w,
            height: orb.h,
            top:    orb.top,
            left:   orb.left,
            opacity: orb.opacity,
            background: `radial-gradient(circle at 40% 40%,
              rgba(215, 185, 140, 1)   0%,
              rgba(197, 168, 128, 0.7) 35%,
              rgba(160, 130, 89,  0.3) 65%,
              transparent 80%
            )`,
            filter: 'blur(80px)',
            mixBlendMode: 'screen',
            animationDuration: orb.dur,
            animationDelay:    orb.delay,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Small glowing sparkle dots */}
      {sparks.map((s, i) => (
        <div
          key={`spark-${i}`}
          className="absolute rounded-full gold-spark-float"
          style={{
            width:  s.size,
            height: s.size,
            top:    s.top,
            left:   s.left,
            opacity: 0.6,
            background: 'radial-gradient(circle, rgba(240,210,160,1) 0%, rgba(215,185,140,0.5) 60%, transparent 100%)',
            filter: 'blur(1.5px)',
            mixBlendMode: 'screen',
            animationDuration: s.dur,
            animationDelay:    s.delay,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default GoldTrailsBackground;
