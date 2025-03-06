"use client";

//hooks
import { useState } from "react";
import { useForm } from "react-hook-form";

//validation
import { loginSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PasswordInput from "../ui/custom/PasswordInput";

export default function LoginForm() {
  //state
  const [isHoveringGoogle, setIsHoveringGoogle] = useState<boolean>(false);
  const [isHoveringGitHub, setIsHoveringGitHub] = useState<boolean>(false);

  //hooks
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //methods
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

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
                  <PasswordInput placeholder="Your password" field={field} />
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
      <div className="flex justify-between items-center">
        <span className="w-2/5">
          <Separator />
        </span>
        OR
        <span className="w-2/5">
          <Separator />
        </span>
      </div>
      <Button
        className="dark:bg-secondary dark:hover:bg-secondary/70 relative"
        onMouseEnter={() => setIsHoveringGitHub((prev) => !prev)}
        onMouseLeave={() => setIsHoveringGitHub((prev) => !prev)}
      >
        <div className="flex items-center justify-center w-full">
          <FaGithub
            fill="white"
            className={`transition-all duration-300 ease-in-out transform ${
              isHoveringGitHub ? "-translate-x-[80px]" : "translate-x-0"
            }`}
            size={18}
          />
          <span
            className={`text-white absolute left-1/2 transform -translate-y-1/2 top-1/2 transition-all duration-300 ease-in-out ${
              isHoveringGitHub
                ? "opacity-100 translate-x-[-60px]"
                : "opacity-0 translate-x-[20px]"
            }`}
          >
            Continue with GitHub
          </span>
        </div>
      </Button>
      <Button
        className="bg-blue-500 hover:bg-blue-500/70 relative"
        onMouseEnter={() => setIsHoveringGoogle((prev) => !prev)}
        onMouseLeave={() => setIsHoveringGoogle((prev) => !prev)}
      >
        <div className="flex items-center justify-center w-full">
          <FaGoogle
            fill="white"
            className={`transition-all duration-300 ease-in-out transform ${
              isHoveringGoogle ? "-translate-x-[80px]" : "translate-x-0"
            }`}
            size={18}
          />
          <span
            className={`text-white absolute left-1/2 transform -translate-y-1/2 top-1/2 transition-all duration-300 ease-in-out ${
              isHoveringGoogle
                ? "opacity-100 translate-x-[-60px]"
                : "opacity-0 translate-x-[20px]"
            }`}
          >
            Continue with Google
          </span>
        </div>
      </Button>
    </>
  );
}
