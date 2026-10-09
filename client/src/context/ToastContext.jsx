import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((msg, dur) => addToast(msg, "success", dur), [addToast]);
  const error = useCallback((msg, dur) => addToast(msg, "error", dur), [addToast]);
  const info = useCallback((msg, dur) => addToast(msg, "info", dur), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info }}>
      {children}
      {/* Toast Overlay */}
      <div className="fixed bottom-5 right-5 z-[99999] flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border text-sm font-medium transition-all transform animate-slide-in ${
              toast.type === "success"
                ? "bg-green-900/95 text-white border-green-600"
                : toast.type === "error"
                ? "bg-red-900/95 text-white border-red-600"
                : "bg-gray-900/95 text-white border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && (
                <CheckCircle className="w-5 h-5 text-lime-400 shrink-0" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-blue-400 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
