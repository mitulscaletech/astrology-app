import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: string | any;
  label: string;
  isSelected: boolean;
  className?: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, className, isSelected, onClick, ...props }) => {
  return (
    <div
      className={cn(
        className,
        "h-16 md:h-20 justify-center flex w-full flex-col gap-1 md:gap-1.5 rounded-lg border-2 px-4 py-2.5 text-left transition-all cursor-pointer",
        isSelected ? "border-primary bg-primary/10" : "border-secondary/30"
      )}
      {...props}
      onClick={onClick}
    >
      {icon && <span className="flex size-5 md:size-6 items-center justify-center">{icon}</span>}
      <span className="text-sm md:text-small lg:text-base">{label}</span>
    </div>
  );
};

export default IconButton;
