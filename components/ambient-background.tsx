export function AmbientBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {/* Subtle Dot Grid Layer */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Top Center Ambient Glow */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-indigo-500/8 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Mid Left Accent Glow */}
      <div 
        className="absolute top-[35%] -left-64 w-[600px] h-[600px] bg-cyan-600/6 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Lower Right Accent Glow */}
      <div 
        className="absolute top-[65%] -right-64 w-[600px] h-[600px] bg-indigo-600/7 rounded-full blur-[140px] pointer-events-none"
      />
    </div>
  );
}
