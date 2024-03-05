const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

//====================================================

const SESSION_KEY = 'sessionAuth'

const saveSession = (session) => {
  try {

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session),
    )
  } catch (er) {
    console.log(er)
  }
}

const loadSession = () => {
  try {
    const session  = localStorage.getItem(SESSION_KEY);
    return session  ? JSON.parse(session ) : null;
  } catch (er) {
    console.log(er);
    return null;
  }
};

//====================================================

module.exports = { 
  saveSession, 
  loadSession,
};