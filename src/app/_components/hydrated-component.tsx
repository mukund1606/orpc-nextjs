import { getQueryClient, HydrateClient, serverQuery } from "~/lib/orpc/server";
import { ClientTest } from "./client-test";

export const ServerHydratedComponent = async ({ name }: { name: string }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    serverQuery.greeting.name.queryOptions({
      input: {
        body: {
          name,
        },
      },
    }),
  );

  return (
    <HydrateClient>
      <div className="flex gap-4">
        <p>Hydrated Client Component:</p>
        <ClientTest name={name} />
      </div>
    </HydrateClient>
  );
};
