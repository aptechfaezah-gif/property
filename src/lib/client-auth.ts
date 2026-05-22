/** Client-side auth — no backend required */

export const DEMO_USER_KEY = "house_demo_user";
export const DEMO_ACCOUNTS_KEY = "house_demo_accounts";

export interface DemoUser {
  name: string;
  email: string;
}

export interface DemoAccount extends DemoUser {
  createdAt: string;
}

export function setDemoLogin(user: DemoUser): void {
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `house_token=house_demo_session; path=/; max-age=${maxAge}; SameSite=Lax`;
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
}

/** Create HOUSE account locally + log user in */
export function createDemoAccount(
  name: string,
  email: string,
  _password: string
): void {
  const account: DemoAccount = {
    name: name.trim(),
    email: email.trim(),
    createdAt: new Date().toISOString(),
  };

  const existing = getDemoAccounts();
  const withoutDuplicate = existing.filter(
    (a) => a.email.toLowerCase() !== account.email.toLowerCase()
  );
  withoutDuplicate.push(account);
  localStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(withoutDuplicate));

  setDemoLogin({ name: account.name, email: account.email });
}

export function getDemoAccounts(): DemoAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DEMO_ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as DemoAccount[]) : [];
  } catch {
    return [];
  }
}

export function clearDemoLogin(): void {
  document.cookie = "house_token=; path=/; max-age=0; SameSite=Lax";
  localStorage.removeItem(DEMO_USER_KEY);
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function isDemoLoggedIn(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("house_token=house_demo_session");
}
