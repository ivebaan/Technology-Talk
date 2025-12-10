import React from "react";
import { FaBookmark } from "react-icons/fa";

export default function FavoriteButton({
  isFavorite = false,
  onToggle,
  label = true,
  disabled = false,
  variant = "default", // "default" | "compact"
}) {
  const baseClasses = `flex items-center gap-1 transition-all duration-200 font-semibold ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  if (variant === "compact") {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          !disabled && onToggle?.();
        }}
        disabled={disabled}
        className={`p-1 rounded transition-all text-xs ${
          isFavorite
            ? "text-yellow-500"
            : "text-gray-400 hover:text-yellow-500"
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaBookmark size={14} />
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        !disabled && onToggle?.();
      }}
      disabled={disabled}
      className={`${baseClasses} px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
        isFavorite
          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
      }`}
    >
      <FaBookmark size={12} />
      {label && <span>{isFavorite ? "Favorited" : "Favorite"}</span>}
    </button>
  );
}
