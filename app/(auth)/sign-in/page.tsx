"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  //hooks
  const form = useForm<z.infer<typeof loginSchema>>({
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
        <CardDescription className="text-xs">
          and explore its various functionalities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">E-mail</Label>
              <Input id="name" placeholder="Your email" />
            </div>
            <div className="flex flex-col space-y-1.5"></div>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between"></CardFooter> */}
    </>
  );
}
