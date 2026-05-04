import {AdminMiddleware} from "@/middlewares/admin.middleware";

const Page = async () => {
    await AdminMiddleware()

    return (
        <div>

        </div>
    )
}

export default Page;