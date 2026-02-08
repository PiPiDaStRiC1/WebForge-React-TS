import type { AuthData } from "@/types";

const initialAuthData: AuthData = { isLoggedIn: false, currentUserId: null, token: undefined };

export class AuthStore {
    getAuthData(): AuthData {
        const raw = localStorage.getItem("auth-data");

        if (!raw) {
            localStorage.setItem("auth-data", JSON.stringify(initialAuthData));
            return initialAuthData;
        }

        try {
            const parsed = JSON.parse(raw) as AuthData;

            if (typeof parsed !== "object" || parsed === null) return initialAuthData;

            return parsed;
        } catch (error) {
            console.error("Failed to parse auth-data:", error);

            localStorage.setItem("auth-data", JSON.stringify(initialAuthData));

            return initialAuthData;
        }
    }
    getToken(): string | undefined {
        const authData = this.getAuthData();
        return authData.token;
    }
    getUserId(): number | null {
        const authData = this.getAuthData();
        return authData.currentUserId;
    }
    setAuthData(newAuthData: AuthData) {
        localStorage.setItem("auth-data", JSON.stringify(newAuthData));
    }
}
