export const REG_EXP_EMAIL = new RegExp(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
  )
  
  export const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  )