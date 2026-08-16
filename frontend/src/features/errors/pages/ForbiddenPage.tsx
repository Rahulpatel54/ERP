import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
        <ShieldAlert className="h-8 w-8 text-danger" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-danger">403</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Access denied</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          You don't have permission to view this page. Contact your admin if you think this is
          a mistake.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
