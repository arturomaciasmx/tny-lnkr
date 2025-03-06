import Background from "~/components/background";
import type { Route } from "./+types/home";
import { Form, useFetcher, type ActionFunctionArgs } from "react-router";
import { storeUrl } from "~/.server/short";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ actionData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  console.log(fetcher.data);
  return (
    <>
      <Background />
      <div className="container mx-auto max-w-[900px] z-10 relative pt-28">
        <h1 className="text-dark text-8xl font-extrabold uppercase text-center -tracking-widest dark:text-light">
          ✨ Shorten Your Links,{" "}
          <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
            Instantly!
          </span>
        </h1>
        <p className="text-xl uppercase font-light text-center mt-2 dark:text-light">
          Paste your long URL below and get a sleek, shareable link in seconds.
        </p>

        <div className="mt-14">
          <fetcher.Form method="post">
            <input
              type="url"
              name="url"
              placeholder="Enter your URL and watch it shrink!"
              className="w-full bg-border/10 backdrop-blur-md rounded-sm p-4"
            />
            <button
              type="submit"
              className="bg-primary text-light py-4 px-12 rounded-sm mx-auto block mt-8 font-semibold hover:bg-accent transition-colors cursor-pointer"
            >
              🔗 Shorten URL
            </button>
          </fetcher.Form>
        </div>
        {fetcher.data ? <p>{fetcher.data}</p> : null}
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action");

  const formData = await request.formData();
  const url = formData.get("url") as string;
  const res = await storeUrl(url);
  console.log("🚀 ~ home.tsx:57 ~ action ~ res:", res);
  return res;
}
