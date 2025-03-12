import { api } from '~/lib/orpc/server';

export const ServerTest = async ({ name }: { name: string }) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const data = await api.greeting.name({
		body: {
			name,
		},
	});

	console.log(data);

	return <p>{data?.body.greeting}</p>;
};
