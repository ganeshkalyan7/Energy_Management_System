import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCarSide } from 'react-icons/fa';
import './Hashtic.css'; // Assuming you have an App.css file for styling

const cellSize = 100; // Size of each cell in pixels
const gridSize = 12; // 12x12 grid

const car1Coordinates = [
  { x: 0, y: 0 },
  { x: 0, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 4 },
  { x: 3, y: 1 },
  { x: 11, y: 11 }
];

const car2Coordinates = [
  { x: 11, y: 11 },
  { x: 10, y: 10 },
  { x: 9, y: 9 },
  { x: 8, y: 8 },
  { x: 7, y: 7 },
  { x: 0, y: 0 }
];

function HashticCode() {
  const [car1Index, setCar1Index] = useState(0);
  const [car2Index, setCar2Index] = useState(0);

  const car1Speed = 3000; // Time in milliseconds to move between cells
  const car2Speed = 3500;

  useEffect(() => {
    const car1Interval = setInterval(() => {
      setCar1Index(prev => (prev + 1) % car1Coordinates.length);
    }, car1Speed);

    const car2Interval = setInterval(() => {
      setCar2Index(prev => (prev + 1) % car2Coordinates.length);
    }, car2Speed);

    return () => {
      clearInterval(car1Interval);
      clearInterval(car2Interval);
    };
  }, [car1Speed, car2Speed]);

  return (
    <div className="grid" style={{marginLeft:"90px",marginTop:"90px"}}>
      {Array.from({ length: gridSize }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: gridSize }).map((_, colIndex) => (
            <div key={colIndex} className="cell">
              {`(${rowIndex},${colIndex})`}
            </div>
          ))}
        </div>
      ))}

      {/* Car 1 */}
      <motion.div
        className="car"
        animate={{
          x: car1Coordinates[car1Index].x * cellSize,
          y: car1Coordinates[car1Index].y * cellSize,
        }}
        transition={{
          ease: "linear",
          duration: car1Speed / 1000, // Convert milliseconds to seconds
        }}
        style={{
          width: cellSize,
          height: cellSize,
        }}
      >
        🚗
      </motion.div>

      {/* Car 2 */}
      <motion.div
        className="car"
        animate={{
          x: car2Coordinates[car2Index].x * cellSize,
          y: car2Coordinates[car2Index].y * cellSize,
        }}
        transition={{
          ease: "linear",
          duration: car2Speed / 1000, // Convert milliseconds to seconds
        }}
        style={{
          width: cellSize,
          height: cellSize,
        }}
      >
        <FaCarSide />
      </motion.div>
    </div>
  );
}

export default HashticCode;
