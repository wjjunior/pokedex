import React from "react";
import { makeList } from "@/main/factories/pages/list/list-factory";

export default function Home() {
  const ListComponent = makeList();
  return <>{ListComponent}</>;
}
