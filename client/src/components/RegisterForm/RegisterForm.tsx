"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useCheckEmail } from "@/hooks/useAuth";
import { checkUserEmail } from "@/lib/schema/authUserSchema";
import { useEffect, useState } from "react";
import * as z from "zod";
import { Err } from "../../../types/auth";
import Input from "../ui/Input";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<Err>({
    firstName: [],
    lastName: [],
    email: [],
  });
  const { mutate, error, isPending } = useCheckEmail();

  useEffect(() => {
    console.log("Error From Hook: ", error);
  }, [error]);

  const continueToVerification = () => {
    const { success, data, error } = checkUserEmail.safeParse(formData);

    console.log("Success: ", success);
    console.log("Data: ", data);

    if (!success) {
      console.log("Error: ", z.flattenError(error).fieldErrors);
      setErrors(z.flattenError(error).fieldErrors);
      return;
    }

    mutate(formData.email, {
      onSuccess: (data) => {
        console.log("Success: ", data);

        if (data.found) {
          setErrors({ ...errors, email: ["Email Already Exists"] });
        } else {
          router.push("/register/verify");
        }
      },
      onError: (err) => {
        console.log("Error: ", err);
      },
    });

    // router.push("/register/verify");
  };

  const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })

    setErrors({
      ...errors,
      [e.target.name]: []
    })
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col gap-4"
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="relative flex flex-col justify-center">
          <span className="absolute -top-5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
            {errors.firstName}
          </span>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChangeHandler={handleInputFieldChange}
            errorsCondtion={errors.firstName && errors.firstName.length > 0}
          />
        </div>
        <div className="relative flex flex-col justify-center">
          <span className="absolute -top-5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
            {errors.firstName}
          </span>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChangeHandler={handleInputFieldChange}
            errorsCondtion={errors.lastName && errors.lastName.length > 0}
          />
        </div>
      </div>
      <div className="relative flex flex-col justify-center gap-1">
        <span className="absolute -top-4.5 left-0 z-10 mt-0.5 px-1 text-xs text-red-400">
          {errors.email}
        </span>
        {/* <h1 className="text-md px-1 font-bold">Email</h1> */}
        {/* <span className='absolute left-0'><Mail/></span> */}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChangeHandler={handleInputFieldChange}
          errorsCondtion={errors.email && errors.email.length > 0}
        />
      </div>

      <Button disabled={isPending} onClick={continueToVerification}>
        <div className="flex items-center justify-center gap-2">
          {isPending ? (
            <span>
              {" "}
              <Loader2 className="size-5 animate-spin" />{" "}
            </span>
          ) : (
            <span>Continue</span>
          )}{" "}
          {!isPending && (
            <span>
              <ArrowRight className="size-5" />
            </span>
          )}
        </div>
      </Button>
    </form>
  );
}
