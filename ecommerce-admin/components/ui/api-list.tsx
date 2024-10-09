"use client";

import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

const ApiList = ({ entityName, entityId }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  return (
    <>
      <ApiAlert
        variant="public"
        title="GET"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />

      <ApiAlert
        variant="public"
        title="GET"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityId}`}
      />

      <ApiAlert
        variant="admin"
        title="POST"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />

      <ApiAlert
        variant="admin"
        title="PATCH"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityId}`}
      />

      <ApiAlert
        variant="admin"
        title="DELETE"
        description={`${origin}/api/${params.storeId}/${entityName}/${entityId}`}
      />
    </>
  );
};

export default ApiList;
