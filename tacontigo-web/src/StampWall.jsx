// Faint "¡Pásele, pásele! Aquí está lo bueno." stamps on the page background, like a taquería wall.
// Each pair reads in order (big line, then the smaller line under it). Decorative only: hidden from screen readers.
import React from "react";
import "./StampWall.css";

// [top %, left %, tilt deg] for each pair; spread so a tall or short section still gets a few.
const PAIRS = [
  [4, 3, -6],
  [10, 70, 4],
  [38, 36, -4],
  [52, 82, 6],
  [70, 6, 5],
  [88, 58, -5],
];

const StampWall = ({ tone = "light", pairs = PAIRS.length }) => (
  <div className={`stamp-wall stamp-wall-${tone}`} aria-hidden="true">
    {PAIRS.slice(0, pairs).map(([top, left, tilt]) => (
      <div key={`${top}-${left}`} className="wall-pair" style={{ top: `${top}%`, left: `${left}%`, "--tilt": `${tilt}deg` }}>
        <span className="wall-stamp big">¡PASELE PASELE!</span>
        <span className="wall-stamp small">AQUI ESTA LO BUENO</span>
      </div>
    ))}
  </div>
);

export default StampWall;
