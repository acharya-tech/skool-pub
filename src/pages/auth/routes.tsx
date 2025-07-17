import { lazy } from 'react';
import { AuthSplitLayout } from 'src/layouts/auth-split';
const SignInPage = lazy(() => import("./signin/index"));

export const authRoute = [
    {
        path: "signin",
        element: (
            <AuthSplitLayout
                slotProps={{
                    section: { title: 'Hi, Welcome back' },
                }}
            >
                <SignInPage />
            </AuthSplitLayout>
        ),
    }
]

