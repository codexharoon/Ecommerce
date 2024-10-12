"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
  };

  const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
  };

  function onCopy() {
    navigator.clipboard.writeText(description);
    toast.success("Copied to clipboard");
  }
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <p className="relative font-semibold rounded bg-muted font-mono text-sm px-[0.3rem] py-[0.2rem]">
          {description}
        </p>

        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
