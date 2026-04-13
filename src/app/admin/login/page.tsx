import LoginForm from "@/shared/components/forms/auth/login.form";

export const dynamic = "force-static"

const Login = () => {
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}
        >
            <div className={"h-screen grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;