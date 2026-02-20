import type { Metadata } from "next";
import { NO_INDEX_PAGE } from "@/constans/seo.constans";
import Auth from "@/app/auth/Auth";

export const metadata: Metadata = {
    title: 'Auth',
    ...NO_INDEX_PAGE
}

const AuthPage = () => {
    return (
        <div>
            <Auth />
        </div>
    )
};

export default AuthPage;