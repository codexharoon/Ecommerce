"use client";

import React from "react";
import { Heading } from "./ui/Heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const SettingsForm = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store preferences" />

        <Button variant={"destructive"} size={"sm"}>
          <Trash className="h-5 w-5" />
        </Button>
      </div>

      {/* sperator */}

      {/* form  */}
    </div>
  );
};

export default SettingsForm;
