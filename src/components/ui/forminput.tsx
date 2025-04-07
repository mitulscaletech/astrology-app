import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  register: any;
  error?: string;
}

export const FormInput = ({ label, id, type = "text", register, error }: FormInputProps) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} {...register(id)} />
    {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
  </div>
);
