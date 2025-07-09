"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OtpModal from "@/components/OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName:
            formType === "sign-up"
                ? z.string().min(2).max(50)
                : z.string().optional(),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null);

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const user =
                type === "sign-up"
                    ? await createAccount({
                        fullName: values.fullName || "",
                        email: values.email,
                    })
                    : await signInUser({ email: values.email });

            setAccountId(user.accountId);
        } catch {
            setErrorMessage("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (


            <div className="flex min-h-screen w-full items-center justify-center bg-gray-100  p-4">
                <div className='flex w-4/6 rounded-2xl bg-white p-8 shadow-lg'>
                    <div className='flex flex-col items-start justify-start gap-3'>
                        <Image
                            src="/assets/icons/logo-full-brand.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className=" hidden h-auto lg:block"
                        />
                        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
                            {type === "sign-in" ? "Войти" : "Создайте ваш аккаунт"}
                        </h1>
                        <p>Для перехода к Google Диску войдите в свой аккаунт Google. Этот аккаунт будет доступен другим приложениям Google в браузере.</p>
                    </div>
                    <div className="w-full max-w-md rounded-xl  p-8 ">


                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {type === "sign-up" && (
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-sm text-gray-700">
                                                    Полное имя
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Ваше полное имя"
                                                        className="h-11 rounded-md border px-3 text-sm shadow-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 text-xs"/>
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-gray-700">
                                                Электронная почта
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="you@example.com"
                                                    className="h-11 rounded-md border px-3 text-sm shadow-sm"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-xs"/>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="hover:bg-blue-700 disabled:bg-blue-400 h-11 w-full rounded-md bg-[#0a56e4] text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Image
                                                src="/assets/icons/loader.svg"
                                                alt="loader"
                                                width={20}
                                                height={20}
                                                className="animate-spin"
                                            />
                                            <span>Загрузка</span>
                                        </div>
                                    ) : (
                                        type === "sign-in" ? "Войти" : "Зарегистрироваться"
                                    )}
                                </Button>

                                {errorMessage && (
                                    <p className="text-red-500 text-center text-sm">{errorMessage}</p>
                                )}

                                <div className="text-center text-sm text-gray-600">
                                    {type === "sign-in"
                                        ? "Нету аккаунта?"
                                        : "Уже есть аккаунт?"}
                                    <Link
                                        href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                                        className="text-blue-600 ml-1 hover:underline"
                                    >
                                        {type === "sign-in" ? "Зарегистрироваться" : "Войти"}
                                    </Link>
                                </div>
                            </form>
                        </Form>

                        {accountId && (
                            <OtpModal email={form.getValues("email")} accountId={accountId}/>
                        )}
                    </div>
                </div>

            </div>


    );
};

export default AuthForm;
