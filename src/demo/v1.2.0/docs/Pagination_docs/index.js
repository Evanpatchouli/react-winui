import React, { useState } from "react";
import { NavPageContainer, Pagination } from "@evanpatchouli/react-winui";

const cities = ["Amsterdam", "Athens", "Berlin", "Cairo", "Delhi", "Dublin", "Lima", "Oslo", "Tokyo"];
const pageSize = 3;

export default function PaginationDocs() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * pageSize;
  return (
    <NavPageContainer hasPadding animateTransition={false}>
      <h1>Pagination</h1>
      <h2>City directory</h2>
      <ol start={offset + 1}>
        {cities.slice(offset, offset + pageSize).map((city) => <li key={city}>{city}</li>)}
      </ol>
      <Pagination aria-label="City directory pages" page={page}
        pageCount={Math.ceil(cities.length / pageSize)} onPageChange={setPage} />
      <p>Page numbers start at 1. Use the arrow keys on a page number, or Home and End to reach the first and last pages.</p>
      <pre><code>{'<Pagination pageCount={pageCount} page={page} onPageChange={setPage} />'}</code></pre>
    </NavPageContainer>
  );
}
