import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import StreamVideoClientProvider from "./contexts/StreamVideoClientProvider.tsx";
import '@stream-io/video-react-sdk/dist/css/styles.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
    throw new Error("Clerk Publishable key is missing!");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={publishableKey}>
            <StreamVideoClientProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StreamVideoClientProvider>
        </ClerkProvider>
    </React.StrictMode>
);
