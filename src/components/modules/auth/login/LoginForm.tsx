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
import { useActionState } from "react";

// LoginForm Component
const LoginForm = () => {
  // useActionState hook
  const [state, formAction, isPending] = useActionState(loginUser, null);
  console.log(state);

  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const errorMessage = state?.errors?.find(
        (error: any) => error.field === fieldName
      );
      return errorMessage?.message;
    } else {
      return null;
    }
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
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
            required
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
