"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "~/lib/orpc/client";

export const ClientTest = ({ name }: { name: string }) => {
  const { data } = useQuery(
    orpc.greeting.name.queryOptions({
      input: {
        body: {
          name,
        },
      },
    }),
  );

  return <p>{data?.body.greeting}</p>;
};
