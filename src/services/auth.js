export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  //console.log("Token:", token); // Debugging
  return token !== null;
};
