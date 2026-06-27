"use client";

import Link from "next/link";
import { useState } from "react";

import { AuthDivider } from "@/components/auth/auth-divider";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Email" htmlFor="sign-in-email">
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormField>

      <FormField label="Password" htmlFor="sign-in-password">
        <Input
          id="sign-in-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormField>

      <div className="flex justify-end">
        <Link
          href="#"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full rounded-xl" size="lg">
        Sign in
      </Button>

      <AuthDivider />

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" className="rounded-xl">
          Google
        </Button>
        <Button type="button" variant="outline" className="rounded-xl">
          GitHub
        </Button>
      </div>
    </form>
  );
}
