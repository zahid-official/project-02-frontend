/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import registerPatient from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState } from "react";

// RegisterForm Component
const RegisterForm = () => {
  // useActionState hook
  const [state, formAction, isPending] = useActionState(registerPatient, null);
  console.log(state);

  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const fieldError = state?.errors?.find(
        (error: any) => error.field === fieldName
      );
      return fieldError?.message;
    } else {
      return null;
    }
  };

  return (
    <form action={formAction} className="mt-2">
      <FieldGroup className="gap-4">
        {/* Name */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="name">
            Name
          </FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" />

          {getFieldError("name") && (
            <FieldError>{getFieldError("name")}</FieldError>
          )}
        </Field>

        {/* Email */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="email">
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />

          {getFieldError("email") && (
            <FieldError>{getFieldError("email")}</FieldError>
          )}
        </Field>

        {/* Password */}
        <Field className="gap-1.5">
          <FieldLabel className="ml-1" htmlFor="password">
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />

          {getFieldError("password") && (
            <FieldError>{getFieldError("password")}</FieldError>
          )}
        </Field>

        <div className="flex items-center gap-2">
          {/* Phone */}
          <Field className="gap-1.5">
            <FieldLabel className="ml-1" htmlFor="phone">
              Phone
            </FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder="+880 1900-111222"
            />

            {getFieldError("phone") && (
              <FieldError>{getFieldError("phone")}</FieldError>
            )}
          </Field>

          {/* Gender */}
          <Field className="gap-1.5">
            <FieldLabel className="ml-1">Gender</FieldLabel>
            <Select name="gender">
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>

            {getFieldError("gender") && (
              <FieldError>{getFieldError("gender")}</FieldError>
            )}
          </Field>
        </div>

        {/* Register Button */}
        <Field className="mt-3">
          <Button disabled={isPending} type="submit">
            {isPending ? "Registering..." : "Register"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <Link href="/login">Sign In</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
