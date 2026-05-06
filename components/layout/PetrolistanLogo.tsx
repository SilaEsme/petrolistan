interface Props {
  size?: number;
  variant?: "full" | "icon";
  iconColor?: string;
}

export default function PetrolistanLogo({
  size = 32,
  variant = "full",
  iconColor = "white",
}: Props) {
  const amber = "#BA7517";
  const screenFill = iconColor === "white" ? "#0C447C" : "white";

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pump body */}
      <rect x="3" y="6" width="17" height="23" rx="2" fill={iconColor} />
      {/* Top cap */}
      <rect x="2" y="4" width="19" height="3" rx="1.5" fill={iconColor} />
      {/* Display screen */}
      <rect x="6" y="11" width="10" height="7" rx="1" fill={screenFill} />
      {/* Price display lines */}
      <rect x="8" y="13" width="6" height="1.5" rx="0.75" fill={amber} />
      <rect x="8" y="15.5" width="4" height="1" rx="0.5" fill={amber} />
      {/* Hose arm */}
      <path
        d="M20 9H27V18"
        stroke={iconColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nozzle */}
      <rect x="24" y="18" width="4" height="3" rx="1.5" fill={iconColor} />
    </svg>
  );

  if (variant === "icon") return icon;

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-white font-bold text-xl tracking-tight">
        petrolistan
      </span>
    </div>
  );
}
