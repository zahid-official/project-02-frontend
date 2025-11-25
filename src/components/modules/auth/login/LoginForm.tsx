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
import loginUser from "@/services/auth/loginUser";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// LoginForm Component
const LoginForm = ({ redirect }: { redirect?: string }) => {
  // useActionState hook
  const [state, formAction, isPending] = useActionState(loginUser, null);

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

  // Use effect to handle state toast messages
  useEffect(() => {
    if (state && !state.success) {
      toast.error(state?.message || "Something went wrong!");
    }
  }, [state]);
  return (
    <form action={formAction}>
      {/* Add redirect path data to formData by hidden input */}
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
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
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {/* Forgot Password */}
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
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

        {/* Login Button */}
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? "Logging..." : "Login"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/register">Sign up</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
