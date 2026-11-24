export const usageCode = `import React, { useState } from "react";
import { Pagination } from "@evanpatchouli/react-winui";

const cities = ["Amsterdam", "Athens", "Berlin", "Cairo", "Delhi", "Dublin", "Lima", "Oslo", "Tokyo"];
const pageSize = 3;

export default function CityDirectory() {
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
}`;
