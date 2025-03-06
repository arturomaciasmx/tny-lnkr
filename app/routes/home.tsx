import Background from "~/components/background";
import type { Route } from "./+types/home";
import { Form, useFetcher, type ActionFunctionArgs } from "react-router";
import { storeUrl } from "~/.server/short";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({}: Route.ComponentProps) {
  const fetcher = useFetcher();
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <>
      <div className="container mx-auto max-w-[900px] flex-auto">
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
          {!fetcher.data ? (
            <fetcher.Form method="post">
              <input
                type="url"
                name="url"
                placeholder="Enter your URL and watch it shrink!"
                className="w-full bg-border/10 backdrop-blur-md rounded-sm p-4 dark:placeholder:text-light/50 dark:text-light"
              />
              <button
                type="submit"
                className="bg-primary text-light py-4 px-12 rounded-sm mx-auto block mt-8 font-semibold hover:bg-accent transition-colors cursor-pointer "
              >
                🔗 Shorten URL
              </button>
            </fetcher.Form>
          ) : (
            <>
              <p className="w-full bg-border/10 backdrop-blur-md rounded-sm p-4 dark:text-light text-center">
                {fetcher.data}
              </p>
              <button
                type="submit"
                className="bg-secondary text-light py-4 px-12 rounded-sm mx-auto block mt-8 font-semibold hover:bg-accent transition-colors cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(fetcher.data);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
              </button>
              <button
                className="text-center dark:text-light block mx-auto mt-8 underline underline-offset-4 cursor-pointer"
                onClick={() => fetcher.load("/reset")}
              >
                Shrink other url
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = formData.get("url") as string;
  const res = await storeUrl(url);
  return res;
}
