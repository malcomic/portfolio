import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { router } from "./app/router";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            className: "!bg-white/10 !text-text !backdrop-blur-lg !border !border-white/20",
            duration: 3000,
            success: { iconTheme: { primary: "#00ff88", secondary: "#0a0a0f" } },
            error: { iconTheme: { primary: "#ff4444", secondary: "#0a0a0f" } },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
