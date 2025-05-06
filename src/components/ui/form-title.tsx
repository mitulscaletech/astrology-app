import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

type FormTitleProps = {
  title: string;
  size?: "sm" | "default";
  className?: string;
};

const sizeClasses = {
  sm: "",
  default: ""
};

export function FormTitle({ size = "default", title, className }: FormTitleProps) {
  return (
    <Typography
      variant="h3"
      size="base"
      className={cn("block font-medium text-secondary/70 mb-2 xl:mb-3 uppercase", sizeClasses[size], className)}
    >
      {title}
    </Typography>
  );
}
