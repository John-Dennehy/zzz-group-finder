import { Link } from "@nextui-org/link";

type UrlProps = {
  url: string | null;
};
export function Url({ url }: UrlProps) {
  if (!url) return null;
  return (
    <div className="flex gap-2">
      <h3>Website</h3>
      <Link
        className="text-primary"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </Link>
    </div>
  );
}
