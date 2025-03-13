"use client";

//hooks
import { useForm } from "react-hook-form";

//validation
import { loginSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//icons
import PasswordInput from "../ui/custom/PasswordInput";
import OAuthForm from "./OAuthForm";
import { login } from "@/actions/login";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  //state
  const [loading, setLoading] = useState(false);

  //hooks
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //methods
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const res = await login(values);

      if (res?.error) {
        form.resetField("password");

        toast.error(res.error, {
          description: "Please, try again.",
        });
      }

      if (res?.success) {
        toast.success(res.success);

        router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      <OAuthForm loading={loading} setLoading={setLoading} />
    </>
  );
}
