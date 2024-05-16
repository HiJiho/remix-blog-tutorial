import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createPost } from "~/models/post.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	console.log("11111111111111");
	const formData = await request.formData();
	console.log("222222222222222");
	const title = formData.get("title");
	const slug = formData.get("slug");
	const markdown = formData.get("markdown");
	console.log("333333333333333");
	const errors = {
		title: title ? null : "Title is required",
		slug: slug ? null : "Slug is required",
		markdown: markdown ? null : "Markdown is required",
	};
	console.log("4444444444444444");
	const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
	if (hasErrors) {
		return json(errors);
	}
	console.log("555555555555555");
	invariant(typeof title === "string", "title must be a string");
	invariant(typeof slug === "string", "slug must be a string");
	invariant(typeof markdown === "string", "markdown must be a string");
	console.log("666666666666666");
	await createPost({ title, slug, markdown });
	console.log("7777777777777777");
	return redirect("/posts/admin");
};

const inputClassName =
	"w-full rounded border border-gray-500 px-2 py-1 text-lg";

export default function NewPost() {
	const errors = useActionData<typeof action>();

	return (
		<Form method="post">
			<p>
				<label>Post Title: </label>
				{errors?.title ? (
					<em className="text-red-600">{errors.title}</em>
				) : null}
				<input type="text" name="title" className={inputClassName} />
			</p>
			<p>
				<label>
					Post Slug:{" "}
					{errors?.slug ? (
						<em className="text-red-600">{errors.slug}</em>
					) : null}
					<input type="text" name="slug" className={inputClassName} />
				</label>
			</p>
			<p>
				<label htmlFor="markdown">Markdown: </label>
				{errors?.markdown ? (
					<em className="text-red-600">{errors.markdown}</em>
				) : null}
				<br />
				<textarea
					id="markdown"
					rows={20}
					name="markdown"
					className={`${inputClassName} font-mono`}
				/>
			</p>
			<p className="text-right">
				<button
					type="submit"
					className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
				>
					Create Post
				</button>
			</p>
		</Form>
	);
}
