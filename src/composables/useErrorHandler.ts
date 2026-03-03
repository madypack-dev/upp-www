import { ref } from "vue";
import type { App } from "vue";

type ErrorMeta = {
  source?: string;
  info?: string;
};

const hasRuntimeError = ref(false);
const lastRuntimeErrorMessage = ref<string | null>(null);

let listenersAttached = false;

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown runtime error";
};

export const reportError = (error: unknown, meta?: ErrorMeta) => {
  hasRuntimeError.value = true;
  lastRuntimeErrorMessage.value = toErrorMessage(error);

  console.error("[UPP Runtime Error]", {
    message: lastRuntimeErrorMessage.value,
    meta,
    error,
  });
};

export const clearRuntimeError = () => {
  hasRuntimeError.value = false;
  lastRuntimeErrorMessage.value = null;
};

export const setupGlobalErrorHandling = (app: App<Element>) => {
  app.config.errorHandler = (error, _instance, info) => {
    reportError(error, { source: "vue:errorHandler", info });
  };

  if (listenersAttached) {
    return;
  }

  window.addEventListener("error", (event) => {
    reportError(event.error ?? event.message, { source: "window:error" });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, { source: "window:unhandledrejection" });
  });

  listenersAttached = true;
};

export const useErrorHandler = () => {
  return {
    hasRuntimeError,
    lastRuntimeErrorMessage,
    reportError,
    clearRuntimeError,
  };
};
