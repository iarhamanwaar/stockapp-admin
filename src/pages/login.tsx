import React, { useState } from "react";
import { useLogin } from "@refinedev/core";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { LoadingSpinner } from "../components/ui/loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--brand-light-gray)' }}>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'var(--brand-primary)' }}>
            📦
          </div>
          <CardTitle className="text-2xl font-semibold" style={{ color: 'var(--text-dark)' }}>
            StockApp Admin
          </CardTitle>
          <CardDescription className="text-base" style={{ color: 'var(--text-medium)' }}>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@stockapp.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 px-4 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 px-4 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-white font-semibold flex items-center justify-center" 
              disabled={isLoading}
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};