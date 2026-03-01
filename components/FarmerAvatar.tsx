"use client";

interface FarmerAvatarProps {
  photoUrl?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
};

export function FarmerAvatar({
  photoUrl,
  name,
  size = "md",
  className = "",
}: FarmerAvatarProps) {
  const sizeClass = sizeClasses[size];

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`rounded-full object-cover ${sizeClass} ${className}`}
      />
    );
  }

  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={`flex ${sizeClass} items-center justify-center rounded-full bg-emerald-200 font-semibold text-emerald-800 ${className}`}
    >
      {initial}
    </div>
  );
}
