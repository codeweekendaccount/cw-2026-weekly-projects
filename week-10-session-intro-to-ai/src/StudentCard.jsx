import "./StudentCard.css";

import { useState } from "react";

export default function StudentCard({ name, grade, bio }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card">
      <h2>{name}</h2>
      <button onClick={() => setShowDetails((prev) => !prev)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="details">
          <p>Grade: {grade}</p>
          <p>Bio: {bio}</p>
        </div>
      )}
    </div>
  );
}
