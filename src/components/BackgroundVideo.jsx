import React from 'react';

export function BackgroundVideo() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: '100vh', zIndex: 0 }}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.5 }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional: Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-white/30" />
    </div>
  );
}
