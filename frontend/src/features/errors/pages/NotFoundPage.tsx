import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-8 w-8 text-primary" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
