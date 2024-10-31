"use client";

import { useState } from "react";
import { cn } from "../../../../lib/utils";
import React from "react";

const TriStateButton = ({
  value,
  onChange,
}: {
  value: boolean | null
  onChange: (value: boolean | null) => void
}) => {
  const [initialRender, setInitialRender] = useState(true);

  const handleClick = () => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      if (value === null) {
        onChange(true);
      } else if (value === true) {
        onChange(false);
      } else {
        onChange(null);
      }
    }
  };

  return (
    <button
      className={cn(
        value === null && "bg-gray-200",
        value === true && "bg-green-600",
        value === false && "bg-red-600"
      )}
      onClick={handleClick}
    >
      {value === null && "?"}
      {value === true && "✔"}
      {value === false && "✘"}
    </button>
  );
}
