import ChangeReqForm from "@/shared/components/forms/auth/change-req-password.form";

export const dynamic = "force-static"


const Page = () => {
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <div className={"h-screen grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <ChangeReqForm/>
            </div>
        </div>
    );
};

export default Page;