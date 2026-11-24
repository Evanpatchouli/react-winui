import React, { useState } from "react";
import { NavPageContainer, Pagination } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { usageCode } from "./codes";
import PropsView from "./props-view";

const cities = ["Amsterdam", "Athens", "Berlin", "Cairo", "Delhi", "Dublin", "Lima", "Oslo", "Tokyo"];
const pageSize = 3;

function CityDirectory() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * pageSize;
  return (
    <>
      <ol start={offset + 1}>
        {cities.slice(offset, offset + pageSize).map((city) => <li key={city}>{city}</li>)}
      </ol>
      <Pagination
        aria-label="City directory pages"
        page={page}
        pageCount={Math.ceil(cities.length / pageSize)}
        onPageChange={setPage}
      />
    </>
  );
}

export default function PaginationDocs() {
  return (
    <NavPageContainer hasPadding animateTransition={false}>
      <h1>Pagination</h1>
      <p>Navigate a collection one page at a time.</p>
      <Pagination aria-label="Preview pages" pageCount={3} />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {'import { Pagination } from "@evanpatchouli/react-winui";'}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <p>Page numbers start at 1. Use the arrow keys on a page number, or Home and End to reach the first and last pages.</p>
      <CityDirectory />
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {usageCode.trim()}
      </SyntaxHighlighter>

      <h3>Large page counts</h3>
      <Pagination aria-label="Search result pages" pageCount={100} defaultPage={50} />
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {'<Pagination aria-label="Search result pages" pageCount={100} defaultPage={50} />'}
      </SyntaxHighlighter>

      <h2>Props</h2>
      <PropsView />
    </NavPageContainer>
  );
}
