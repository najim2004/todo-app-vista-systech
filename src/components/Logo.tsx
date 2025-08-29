export default function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Triangle base - coral/orange */}
        <path
          d="M20 6L32 30H8L20 6Z"
          fill="url(#gradient1)"
        />
        {/* Inner triangle - purple */}
        <path
          d="M20 12L26 24H14L20 12Z"
          fill="url(#gradient2)"
        />
        {/* Small triangle accent - blue */}
        <path
          d="M20 16L22 20H18L20 16Z"
          fill="url(#gradient3)"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#fb7185", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}