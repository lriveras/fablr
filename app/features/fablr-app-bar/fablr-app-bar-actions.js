const onLogin = () => {
  return {
    type: 'LOGIN', 
  }
};

const onLogout = () => {
  return {
    type: 'LOGOUT', 
  }
};

export { onLogin, onLogout };