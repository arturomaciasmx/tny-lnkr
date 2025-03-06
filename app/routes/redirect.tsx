import { getUrl } from "~/.server/short";
import type { Route } from "./+types/redirect";
import { redirect } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await getUrl(params.shortCode);
  if (res && res.ok) {
    const url = res.url;
    return redirect(url);
  }
  return null;
}
