"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import AuthTabs from "../components/AuthTabs/AuthTabs";
import { useSignupMutation } from "../hooks/useAuth";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending, isError } = useSignupMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ full_name: fullName, phone, password });
  };

  return (
    <div>
      <AuthTabs />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Ad"
          size="lg"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          <p className="text-sm text-error">
            Qeydiyyat uğursuz oldu, yenidən cəhd edin.
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isPending}
        >
          Tamamla
        </Button>
        <p className="text-sm text-[#1A1D28]">
          Hesabınız var?{" "}
          <Link href="/login" className="text-primary">
            Daxil ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
