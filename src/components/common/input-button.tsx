import { cn } from "@/lib/utils";

interface InputButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputButton: React.FC<InputButtonProps> = ({ label = "Other:", className, ...props }) => {
  return (
    <div
      className={cn(
        "h-16 md:h-20 justify-center flex flex-col gap-1 md:gap-1.5 border-secondary/30 rounded-lg border-2 px-4 py-3 transition-all hover:border-red-300",
        className
      )}
    >
      <label className="text-sm text-gray-500">{label}</label>
      <input type="text" {...props} className="border-none p-0 text-base outline-none" />
    </div>
  );
};

export default InputButton;
