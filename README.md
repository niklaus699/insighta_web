# ⚛️ Insighta Labs Dashboard
A modern, responsive monitoring portal built with **Next.js 16** and **Tailwind CSS**.

### 🚀 Key Features
*   **Secure Session Management**: Leverages HTTP-only cookies via `withCredentials` to prevent XSS-based token theft.
*   **Axios Interceptor**: Automatically handles CSRF tokens and ensures the `Authorization` header doesn't conflict with browser cookies.
*   **Protected Routes**: Role-based access control (RBAC) to ensure only authorized analysts can view metrics.

### 🛠️ Local Setup
1.  **Environment**: Set `NEXT_PUBLIC_API_URL` to point to your Flask backend.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

### 📂 Folder Structure
*   `lib/api.ts`: Central Axios configuration and interceptor logic.
*   `app/dashboard/`: Main metrics and account views.