import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
  return (
    <form className="mt-2">
      <FieldGroup className="gap-4">
        {/* Name */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="name">
            Name
          </FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field>

        {/* Email */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="email">
            Email
          </FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>

        {/* Password */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="password">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </Field>

        <div className="flex items-center gap-2">
          {/* Phone */}
          <Field className="gap-1.5">
            <FieldLabel className="ml-1" htmlFor="phone">
              Phone
            </FieldLabel>
            <Input
              id="phone"
              type="number"
              placeholder="+880 1900-111222"
              required
            />
          </Field>

          {/* Gender */}
          <Field className="gap-1.5">
            <FieldLabel className="ml-1">Gender</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Register Button */}
        <Field className="mt-3">
          <Button type="submit">Register</Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link href="/login">Sign In</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
