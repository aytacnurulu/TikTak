"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import { useLoginMutation } from "../hooks/useAuth";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useLoginMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ phone, password });
  };

  return (
    <div>
      <AuthTabs />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Telefon nömrəsi"
          size="lg"
          type="tel"
          placeholder="+994 XX XXX XX XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Input
          label="Parol"
          size="lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isError && (
          <p className="text-sm text-error">Telefon və ya parol yanlışdır.</p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
        >
          Daxil ol
        </Button>
        <p className="text-sm text-[#1A1D28]">
          Hesabınız yoxdur?{" "}
          <Link href="/register" className="text-primary">
            Qeydiyyatdan keç
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
