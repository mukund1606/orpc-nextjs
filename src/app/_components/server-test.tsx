import { apiClient } from '~/lib/orpc/server';

export const ServerTest = async ({ name }: { name: string }) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const data = await apiClient.greeting.name({
		body: {
			name,
		},
	});

	return <p>{data?.body.greeting}</p>;
};
