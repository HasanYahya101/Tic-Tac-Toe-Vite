import React from 'react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import { Database } from '@sqlitecloud/drivers';

function SignUpLogin() {

    let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [emailsignup, setEmailsignup] = React.useState("");
    const [passwordsignup, setPasswordsignup] = React.useState("");

    const [emaillogin, setEmaillogin] = React.useState("");
    const [passwordlogin, setPasswordlogin] = React.useState("");

    const [checkbox, setCheckbox] = React.useState(false);

    const { toast } = useToast();

    const handleSubmitSignup = (e) => {
        if (!emailsignup.includes("@") || !emailsignup.includes(".")) {
            toast({
                title: "Error: Invalid Email",
                description: "Please enter a valid email address, and try again.",
            })
        }
        else if (passwordsignup.length < 8) {
            toast({
                title: "Error: Password too short",
                description: "Password must be at least 8 characters long.",
            })
        }
        else if (emailsignup === "" || passwordsignup === "") {
            toast({
                title: "Error: Empty Fields",
                description: "Please fill in all the required fields, and try again.",
            })
        }
        else if (firstName === "" || lastName === "") {
            toast({
                title: "Error: Empty Fields",
                description: "Please fill in all the required fields, and try again.",
            })
        }
        else if (emailsignup === "admin" || emailsignup === "Admin") {
            toast({
                title: "Error: Admin Email",
                description: "Please enter a valid email address, and try again.",
            })
        }
        else if (passwordsignup === "admin" || passwordsignup === "Admin") {
            toast({
                title: "Error: Admin Password",
                description: "Please enter a valid password, and try again.",
            })
        }
    }

    const handleSubmitLogin = (e) => {
        if (!emaillogin.includes("@") || !emaillogin.includes(".")) {
            toast({
                title: "Error: Invalid Email",
                description: "Please enter a valid email address, and try again.",
            })
        }
        else if (passwordlogin.length < 8) {
            toast({
                title: "Error: Password too short",
                description: "Password must be at least 8 characters long.",
            })
        }
        else if (emaillogin === "" || passwordlogin === "") {
            toast({
                title: "Error: Empty Fields",
                description: "Please fill in all the required fields, and try again.",
            })
        }
        else {
            if (checkbox === true) {
                // do nothing
            } else {
                toast({
                    title: "Error: Check the box",
                    description: "Please check the box to agree to the terms and conditions.",
                })
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 py-2 text-sm font-medium text-gray-950 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50"
                >Get Started</Button>
            </DialogTrigger>
            <Toaster></Toaster>
            <DialogContent>
                <DialogClose>
                    <button className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <span className="sr-only">Close</span>
                    </button>
                </DialogClose>

                <Tabs defaultValue="signup" className="w-[461px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signup">SignUp</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription
                                >
                                    Create a new account here. After this you will be able to use all services.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="First Name" required
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Last Name" required
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="example@email.com" required type="email"
                                        onChange={(e) => setEmailsignup(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" required type="password" placeholder="*********************"
                                        onChange={(e) => setPasswordsignup(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                </div>
                                <Button className="w-full" type="submit"
                                    onClick={handleSubmitSignup}
                                >
                                    Sign Up
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="login">
                        <Card className="w-full">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">Log In</CardTitle>
                                <CardDescription>Enter your details to access your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="example@email.com" required type="email"
                                        onChange={(e) => setEmaillogin(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" required type="password"
                                        placeholder="*********************"
                                        onChange={(e) => setPasswordlogin(e.target.value)}
                                    />
                                </div>
                                <div className="items-top flex space-x-2">
                                    <Checkbox id="terms1"
                                        htmlFor="terms1"
                                        onClick={() => setCheckbox(!checkbox)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="terms"
                                        >
                                            I agree to the Terms and Conditions
                                        </label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            By signing up, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                                <Button className="w-full" type="submit"
                                    onClick={handleSubmitLogin}
                                >
                                    Log In
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

            </DialogContent>
        </Dialog >
    );
}

export default SignUpLogin;