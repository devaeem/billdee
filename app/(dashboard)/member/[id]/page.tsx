"use client";

import { useParams } from "next/navigation";
import ViewUser from "../components/view-user";

export default function ViewUserPage() {
  const params = useParams();

  return <ViewUser id={params.id as string} />;
}
