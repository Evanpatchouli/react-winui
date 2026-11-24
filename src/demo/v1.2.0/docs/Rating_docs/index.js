import React, { useState } from "react";
import { NavPageContainer, Rating } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { usageCode } from "./codes";
import PropsView from "./props-view";

function PersonalRating() {
  const [score, setScore] = useState(0);
  return (
    <>
      <Rating aria-label="Your rating" value={score} onValueChange={setScore} />
      <p>{score ? `Your score: ${score} of 5` : "No rating yet"}</p>
    </>
  );
}

export default function RatingDocs() {
  return (
    <NavPageContainer hasPadding animateTransition={false}>
      <h1>Rating</h1>
      <p>Collect a star rating or display a read-only average.</p>
      <Rating aria-label="Preview rating" defaultValue={3} />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {'import { Rating } from "@evanpatchouli/react-winui";'}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <p>Select a star, or focus the rating and use the arrow keys.</p>
      <PersonalRating />
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {usageCode.trim()}
      </SyntaxHighlighter>

      <h3>Read-only average</h3>
      <Rating aria-label="Average rating" value={3.5} readOnly />
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {'<Rating aria-label="Average rating" value={3.5} readOnly />'}
      </SyntaxHighlighter>

      <h2>Props</h2>
      <PropsView />
    </NavPageContainer>
  );
}
