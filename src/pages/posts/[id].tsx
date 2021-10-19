import { useRouter } from "next/router"

export default function SinglePost() {
    const router = useRouter()


    return (
        <div>
            posts {router.query.id}
        </div>
    )
}
