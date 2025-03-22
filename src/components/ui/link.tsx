import { cn } from "@/components/utils";
import Link from "next/link";

export function StyledLink({
  className,
  spanClassName,
  children,
  href,
}: {
  className?: string;
  spanClassName?: string;
  children?: React.ReactNode;
  href: string;
}) {
  return (
    <div className="flex justify-center">
      <Link
        href={href}
        className={cn(
          "group relative inline-block px-4 py-2 font-medium",
          className,
        )}
      >
        <span className="absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform rounded-xl bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span
          className={cn(
            "bg-seafoam border-seafoam absolute inset-0 h-full w-full rounded-xl border-2",
            spanClassName,
          )}
        ></span>
        <span className="relative font-bold text-black">{children}</span>
      </Link>
    </div>
  );
}
