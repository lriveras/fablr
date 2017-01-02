const togglefbLoaded = (fbLoaded) => {
  return {
    type: 'LOGIN',
    fbLoaded: !fbLoaded 
  }
};

export {togglefbLoaded};