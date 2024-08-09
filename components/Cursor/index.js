
import React, { useEffect, useState } from "react";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "next-themes";

const Cursor = () => {
  const { theme } = useTheme(); // Destructure theme from useTheme
  const [mounted, setMounted] = useState(false); // Initialize state as false

  const getCustomColor = () => {
    switch (theme) {
      case "dark":
        return "#FFA45B";
      case "light":
        return "#FF7994";
      default:
        return "#FF7994"; // Default color
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <CustomCursor
          targets={[".link"]}
          customClass="custom-cursor"
          dimensions={30}
          fill={getCustomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  );
};

export default Cursor;

