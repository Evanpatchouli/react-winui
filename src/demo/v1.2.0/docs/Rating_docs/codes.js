export const usageCode = `import React, { useState } from "react";
import { Rating } from "@evanpatchouli/react-winui";

export default function PersonalRating() {
  const [score, setScore] = useState(0);
  return (
    <>
      <Rating aria-label="Your rating" value={score} onValueChange={setScore} />
      <p>{score ? \`Your score: \${score} of 5\` : "No rating yet"}</p>
    </>
  );
}`;
