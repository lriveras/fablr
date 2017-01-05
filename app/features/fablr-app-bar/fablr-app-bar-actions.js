const onLogin = (session) => {
  return {
    type: 'LOGIN', 
    session
  }
};

const onLogout = () => {
  return {
    type: 'LOGOUT', 
  }
};

export { onLogin, onLogout };