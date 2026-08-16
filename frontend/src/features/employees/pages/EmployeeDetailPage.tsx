import { useParams } from "react-router-dom";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <PlaceholderPage title={`Employee detail — ${id}`} phase={6} />;
}
