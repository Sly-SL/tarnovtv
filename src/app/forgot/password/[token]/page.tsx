import ChangePasswordForm from "@/shared/components/forms/auth/change-password.form";

export const dynamic = "force-static";

interface Props {
    params: Promise<{ token:string }>;
}

const Page = async ({params}:Props) => {
    const {token} = await params
    
    return (
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <div className={"h-screen grid items-center justify-center w-full bg-white/30 dark:bg-black/40"}>
                <ChangePasswordForm token={token}/>
            </div>
        </div>
    );
};

export default Page;