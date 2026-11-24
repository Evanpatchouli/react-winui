import React, { useState } from "react";
import { NavPageContainer, Rating } from "@evanpatchouli/react-winui";

export default function RatingDocs() {
  const [score, setScore] = useState(0);
  return (
    <NavPageContainer hasPadding animateTransition={false}>
      <h1>Rating</h1>
      <h2>Your rating</h2>
      <p>Select a star, or focus the rating and use the arrow keys.</p>
      <Rating aria-label="Your rating" value={score} onValueChange={setScore} />
      <p>{score ? `Your score: ${score} of 5` : "No rating yet"}</p>
      <h2>Average rating</h2>
      <Rating aria-label="Average rating" value={3.5} readOnly />
      <pre><code>{'<Rating aria-label="Your rating" value={score} onValueChange={setScore} />'}</code></pre>
    </NavPageContainer>
  );
}
