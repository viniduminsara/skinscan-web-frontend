import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import * as AuthService from '../api/services/authService';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserInfo } from "../store/slices/userSlice";
import { signIn, setAuthChecked } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { MobileHeader } from "./mobile-header";

interface LayoutProps {
    onSignOut: () => void;
}

export function Layout({ onSignOut }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onSignOut={onSignOut} />
            <div className="flex-1 overflow-auto">
                <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
                <Outlet />
            </div>
        </div>
    );
}