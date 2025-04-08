import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  register: any;
  error?: string;
  name?: string;
}

export const FormInput = ({ label, id, type = "text", register, error, ...rest }: FormInputProps) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} {...register(id)} {...rest} />
    {error && <p className='text-danger text-sm mt-1'>{error}</p>}
  </div>
);
