import React, { useEffect, useState } from "react";

function getRandomColor() {
  const colors = ["#27f5f1", "#6d28d9"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getRandomPosition() {
  return {
    top: Math.random() * window.innerHeight,
    left: Math.random() * window.innerWidth,
  };
}

function AuroraBackground() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const generateRandomShape = () => {
      const shapeType = Math.floor(Math.random() * 3); // Randomly choose shape type: 0 for circle, 1 for square, 2 for triangle
      const position = getRandomPosition();
      const shape = {
        id: Date.now(), // Unique identifier for the shape
        type: shapeType,
        top: position.top, // Random top position
        left: position.left, // Random left position
        rotation: Math.random() * 360, // Random rotation angle
        color: getRandomColor(), // Random color
        originPosition: position, // Original position
        targetPosition: getRandomPosition(), // Random target position
      };
      setShapes((prevShapes) => [...prevShapes, shape]);
      const moveTimeoutId = setTimeout(() => moveShape(shape.id), 100); // Start moving the shape after a short delay
      const removeTimeoutId = setTimeout(() => removeShape(shape.id), 30000); // Remove the shape after 30 seconds
      return () => {
        clearTimeout(moveTimeoutId);
        clearTimeout(removeTimeoutId);
      };
    };

    const moveShape = (id) => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === id
            ? {
                ...shape,
                top: shape.targetPosition.top,
                left: shape.targetPosition.left,
              }
            : shape
        )
      );
    };

    const removeShape = (id) => {
      setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
    };

    const intervalId = setInterval(generateRandomShape, 1000); // Generate a new shape every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden blur-lg z-[-1]">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${
            shape.type === 0
              ? "h-20 w-20 rounded-full"
              : shape.type === 1
              ? "h-20 w-20"
              : "w-0 h-0"
          }`}
          style={{
            top: shape.top,
            left: shape.left,
            transform: `rotate(${shape.rotation}deg)`,
            backgroundColor: shape.color,
            transition: "all 10s", // Set animation duration to 10 seconds
          }}
        />
      ))}
    </div>
  );
}

export default AuroraBackground;
