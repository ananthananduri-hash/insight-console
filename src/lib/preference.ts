import type { Pillar } from "@/lib/posts";

export const PREFERENCE_STORAGE_KEY = "measured-notes:pillar-preference";
export const PREFERENCE_EVENT = "measured-notes:pillar-preference-changed";

export type StoredPreference = Pillar | "skipped" | null;

export function getStoredPreference(): StoredPreference {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(PREFERENCE_STORAGE_KEY);
    if (value === "analytics" || value === "career" || value === "healthcare" || value === "skipped") {
      return value;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredPreference(value: StoredPreference) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) {
      window.localStorage.removeItem(PREFERENCE_STORAGE_KEY);
    } else {
      window.localStorage.setItem(PREFERENCE_STORAGE_KEY, value);
    }
    window.dispatchEvent(new Event(PREFERENCE_EVENT));
  } catch {
    // localStorage unavailable (private browsing, etc.) - fail silently
  }
}
