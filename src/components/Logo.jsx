export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Ankit Prajapati logo">
      <rect width="64" height="64" rx="14" fill="#0F172A" />
      <path
        d="M20 46 L32 18 L44 46"
        stroke="#FF4F00"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="26" y1="36" x2="38" y2="36" stroke="#FF4F00" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="45" r="4" fill="#FFFFFF" />
    </svg>
  );
}
