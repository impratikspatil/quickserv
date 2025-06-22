const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("token"));

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
  };

  const logout = (navigate) => {
    localStorage.removeItem("token");
    setUser(null);
    if (navigate) navigate("/login"); // only if passed
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
