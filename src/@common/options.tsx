let BASE_URL = "http://localhost:5000";
if (location.hostname === "app.acharyatech.com") {
    BASE_URL = "https://m2.acharyatech.com"
} else if (location.hostname === "nrsa.acharyatech.com") {
    BASE_URL = "https://nrsa-api.acharyatech.com"
}
export { BASE_URL }
export const UPLOAD_URL = `${BASE_URL}/resources`
export const API_KEY = "AIzaSyCiW4aZ-jSkaysfAfZlJWp8bO0iDfO8Jd0"
export const EDITOR_KEY = "fo0nd7qejszi7s4zfxwbv96ozu0hu92y3goc9amv0tn14ppe"

export const SYSTEM_ADMIN_USER_ID = "1";
export const SYSTEM_ADMIN_ROLE_ID = "1";

export const PROJECT_TITLE = "Acharya Achool";
export const TOKEN_KEY = "user-auth";
export const REFRESH_KEY = "refresh-auth";
export const USER_DETAIL = "user-detail";
export const USER_ACCESS = "user-access";