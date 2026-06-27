"use client";

import { useState } from "react";

import { AuthDivider } from "@/components/auth/auth-divider";
import { FormField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Name" htmlFor="sign-up-name">
        <Input
          id="sign-up-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormField>

      <FormField label="Email" htmlFor="sign-up-email">
        <Input
          id="sign-up-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormField>

      <FormField label="Password" htmlFor="sign-up-password">
        <Input
          id="sign-up-password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormField>

      <FormField label="Confirm password" htmlFor="sign-up-confirm-password">
        <Input
          id="sign-up-confirm-password"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </FormField>

      <Button type="submit" className="w-full rounded-xl" size="lg">
        Create account
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
