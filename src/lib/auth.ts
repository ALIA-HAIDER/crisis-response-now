export function loginGovernment(identity: string) {
  localStorage.setItem("auth_role", "government");
  localStorage.setItem("auth_user", identity || "gov");
}

export function logout() {
  localStorage.removeItem("auth_role");
  localStorage.removeItem("auth_user");
}

export function isGovernment(): boolean {
  return localStorage.getItem("auth_role") === "government";
}
