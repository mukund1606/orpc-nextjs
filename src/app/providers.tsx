// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ORPCReactProvider } from "~/lib/orpc/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ORPCReactProvider>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </ORPCReactProvider>
  );
};
