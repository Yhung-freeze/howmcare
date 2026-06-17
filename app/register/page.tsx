"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  if (user) {
    await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
      phone: phone,
      role: "PATIENT",
    });
  }

  alert("Account created. Check your email.");
}
  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <input
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signUp}>Create Account</button>
    </div>
  );
}