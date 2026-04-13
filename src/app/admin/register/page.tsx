import RegisterForm from "@/shared/components/forms/auth/register.form";

export const dynamic = "force-static"

const Register = () => {
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <div className={"h-screen grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;