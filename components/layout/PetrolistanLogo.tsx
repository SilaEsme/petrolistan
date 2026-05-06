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

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer oil drop */}
      <path
        d="M16 2 C21 8 26 15 26 21 A10 10 0 0 1 6 21 C6 15 11 8 16 2Z"
        fill={iconColor}
      />
      {/* Amber oil fill — lower portion */}
      <path
        d="M16 11 C19 15 23 18 23 21 A7 7 0 0 1 9 21 C9 18 13 15 16 11Z"
        fill={amber}
      />
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
