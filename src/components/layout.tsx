import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import * as AuthService from '../api/services/authService';
import { useAppDispatch } from "../store/hooks";
import { setUserInfo } from "../store/slices/userSlice";
import { signIn, setAuthChecked } from "../store/slices/authSlice";
import { useEffect } from "react";

interface LayoutProps {
    onSignOut: () => void;
}

export function Layout({ onSignOut }: LayoutProps) {
    const dispatch = useAppDispatch();

    const fetchProfile = async () => {
        try {
            const res = await AuthService.getCurrentUser();

            if (res.data.success) {
                const userData = res.data.body;
                dispatch(setUserInfo({ id: userData.id, username: userData.username, email: userData.email }));
                dispatch(signIn(userData.id));
            } else {
                dispatch(setAuthChecked(true));
            }
        } catch {
            dispatch(setAuthChecked(true));
        } finally {
            dispatch(setAuthChecked(true));
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar onSignOut={onSignOut} />
            <Outlet />
        </div>
    );
}