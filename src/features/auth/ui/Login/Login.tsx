import {Button} from "@/common/components/Button/Button";
import {Path} from "@/common/routing";
import {useLoginMutation} from "@/features/auth/api/authApi";

export const Login = () => {
    const [login] = useLoginMutation()

    const loginHandler = () => {
        const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect
        const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

        window.open(url, 'oauthPopup', 'width=500,height=600')

        const receiveMessage = async (event: MessageEvent) => {

            if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return

            const {code} = event.data
            if (!code) return

            // Отписываемся от события, чтобы избежать обработки дублирующихся сообщений
            window.removeEventListener('message', receiveMessage)

            login({code, redirectUri, rememberMe: false})
        }

        window.addEventListener('message', receiveMessage)
    }
    return <Button onClick={loginHandler}>Sign up with APIHUB</Button>
};