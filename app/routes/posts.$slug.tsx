import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getPost } from "~/models/post.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = await getPost(params.slug);
	return json({ post });
};

export default function PostSlug() {
	const { post } = useLoaderData<typeof loader>();
	return (
		<main className="mx-auto max-w-4xl">
			<h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
		</main>
	);
}
