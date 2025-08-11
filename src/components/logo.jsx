
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ showDomain = true, className }) => {
  return (
    <Link href="/" className={cn("flex items-end gap-1", className)}>
      <span className="text-4xl sm:text-5xl font-extrabold text-primary -skew-y-6 transform">
        xxx
      </span>
      <span className="text-2xl sm:text-3xl font-bold text-foreground pb-1">
        c
        {showDomain && (
          <span className="text-muted-foreground">.online</span>
        )}
      </span>
    </Link>
  );
};

export default Logo;
