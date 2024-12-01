import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/store/apis/userApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      isLoading: registerisLoading,
      isSuccess: registerisSucceess,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      isLoading: loginisLoading,
      isSuccess: loginisSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    const type2 = type;
    type2 === "signup"
      ? setSignupInput({ ...signupInput, [name]: value })
      : setLoginInput({ ...loginInput, [name]: value });
  };

  useEffect(() => {
    if (loginisSuccess && loginData) {
      toast.success(loginData?.data.message || "Login successful.");
      navigate('/');
    }
    if (registerisSucceess && registerData) {
      toast.success(registerData.data.message || "Signup successful.");

    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup failed");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed");
      // console.log(loginError.data.message)
    }
  }, [
    loginisSuccess,
    loginError,
    registerisSucceess,
    registerError,
    loginData,
    registerData,
  ]);

  const handelButton = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    const result = await action(inputData);
    if (result?.data?.statuscode === 200) {
      setSignupInput({
        username: "",
        email: "",
        password: "",
      });
      setLoginInput({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="flex w-full items-center justify-center mt-20 ">
      <Tabs defaultValue="Register" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Register">Register</TabsTrigger>
          <TabsTrigger value="Log in">Log in</TabsTrigger>
        </TabsList>

        <TabsContent value="Register">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Enter the details and click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  name="username"
                  type="username"
                  value={signupInput.username}
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={signupInput.email}
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="Enter password"
                  required
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerisLoading}
                onClick={() => handelButton("signup")}
              >
                {registerisLoading ? (
                  <>
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="Log in">
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Enter the details and click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="loginemail">Email</Label>
                <Input
                  id="loginemail"
                  placeholder="Enter Username or email"
                  name="email"
                  type="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="loginpassword">Password</Label>
                <Input
                  id="loginpassword"
                  type="password"
                  name="password"
                  value={loginInput.password}
                  placeholder="Enter password"
                  required
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginisLoading}
                onClick={() => {
                  handelButton("login");
                }}
              >
                {loginisLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
