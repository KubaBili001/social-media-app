"use client";

//hooks
import { useState } from "react";
import { useForm } from "react-hook-form";

//validation
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//ui components
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

//icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

//regex
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//form schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email({ message: "Invalid email address" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 characters long, with at least one letter, one number, and one special character.",
  }),
});

export default function SignIn() {
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
      <CardHeader>
        <CardTitle className="text-2xl">Log in to the app</CardTitle>
        <CardDescription className="text-sm">
          and explore its various functionalities.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
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
                    <Input placeholder="Your password" {...field} />
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
          className="bg-secondary hover:bg-secondary/70 relative"
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
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between">
        <span>Don't have an account?</span>
        <Link href={"sign-up"} className="underline cursor-link">
          Sign up
        </Link>
      </CardFooter>
    </>
  );
}
