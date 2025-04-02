"use client";

//hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

//validation
import { registerSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//actions

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
import { toast } from "sonner";
import OAuthForm from "./OAuthForm";
import Loader from "../ui/custom/Loader";
import { register } from "@/actions/auth";

export default function RegisterForm() {
  //state
  const [loading, setLoading] = useState(false);

  //hooks
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  //methods
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);

    try {
      const res = await register(data);

      if (res?.error) {
        form.resetField("password");
        form.resetField("passwordConfirmation");

        toast.error(res.error, {
          description: "Please, try again.",
        });
      }

      if (res?.success) {
        toast.success(res.success, {
          description: "Verify your email to sign in.",
        });

        router.push("/sign-in");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Registration error:", error);
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader dark={false} /> : "Submit"}
          </Button>
        </form>
      </Form>
      <OAuthForm loading={loading} setLoading={setLoading} />
    </>
  );
}
