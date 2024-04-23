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
      const shapeType = Math.floor(Math.random() * 3);
      const position = getRandomPosition();
      const shape = {
        id: Date.now(),
        type: shapeType,
        top: position.top,
        left: position.left,
        rotation: Math.random() * 360,
        color: getRandomColor(),
        originPosition: position,
        targetPosition: getRandomPosition(),
      };
      setShapes((prevShapes) => [...prevShapes, shape]);
      const moveTimeoutId = setTimeout(() => moveShape(shape.id), 100);
      const removeTimeoutId = setTimeout(() => removeShape(shape.id), 30000);
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

    const intervalId = setInterval(generateRandomShape, 1000);

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
            transition: "all 10s",
          }}
        />
      ))}
    </div>
  );
}

export default AuroraBackground;
