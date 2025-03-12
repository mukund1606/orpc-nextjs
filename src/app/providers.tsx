import { ORPCReactProvider } from '~/lib/orpc/client';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <ORPCReactProvider>{children}</ORPCReactProvider>;
};
