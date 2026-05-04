import RegisterForm from "@/shared/components/forms/auth/register.form";
import Animate from "@/shared/components/libs/animate/animate.ssr";

export const dynamic = "force-static"

const Register = () => {
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <div className={"grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <Animate preset={"fadeLeft"}>
                    <RegisterForm/>
                </Animate>
            </div>
        </div>
    );
};

export default Register;