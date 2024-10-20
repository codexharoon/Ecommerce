import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  icon: React.ReactElement;
}

const IconButton = ({ onClick, className, icon }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full bg-white border shadow-md p-2 transition hover:scale-110",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
