"use client"
import { trpc } from "./_trpc/client";


export default function Home() {
  const d = trpc.test.useQuery();
  const units = trpc.getUnits.useQuery();

  return (
    <div>
      <p>
        {d.data}
      </p>
      <div>
        {JSON.stringify(units.data)}
      </div>
    </div>
  );
}
