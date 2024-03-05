// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')
const { saveSession, loadSession } = require('../class/save-session')

//=======================================================================

router.post('/signup-confirm-new-code', function (req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Не вказана електронна пошта",
      });
    }

    const newCode = Confirm.create(email)

    console.log('newCode', newCode)
    
    if(newCode) {
      return res.status(200).json({
        message: "Новий код підтвердження створений успішно",
        confirmationCode: newCode,
      });
    } else{
      return res.status(400).json({
        message: "Помилка при створенні нового коду підтвердження",
      })
    }

    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//======================================================================

router.post('/signup-confirm-code', function (req, res) {
  const { email } = req.body
  // console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові дані відсутні",
    })
  }

  try {

    const confirmationCode = Confirm.getCodeByData(email);

    if(confirmationCode !== null) {
      return res.status(200).json({
        message: 'Ось код',
        confirmationCode,
      })
    } else {
      return res.status(400).json({
        message: "Кода нема",
      })
    }

  }catch (er) {
    console.error('Error', er);
  }
});

//=======================================================================

router.get('/signup', function (req, res) {
    return res.render('signup', {
      name: 'signup',
      title: 'Signup page',
    })
  })

//====================

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Не хватає даних",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }

    const newUser = User.create({ email, password })
    console.log('newUser', newUser)

    const session = Session.create(newUser)

    const confirmationCode = Confirm.create(newUser.email)

    saveSession(session)

    console.log('confirmationCode', confirmationCode)

    return res.status(200).json({
      message: 'Користувач успішно зареєстрованний',
      session,
      confirmationCode,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

//=======================================================================

router.get('/signup-confirm', function (req, res) {
  
    return res.render('signup-confirm', {
      name: 'signup-confirm',  
      title: 'Signup confirm page',
    })
  })

//====================
  
router.post('/signup-confirm', function (req, res) {
  const { confirmationCode } = req.body

  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові дані відсутні",
    })
  }

  try {
    const session = loadSession();
    console.log("Session: ", session)
    
    if (!session) {
      return res.status(400).json({
        message: 'Помилка. Ви не увійшли в аккаунт',
      })
    }

    const user = User.getByEmail(session.user.email)

    user.isConfirm = true

    session.user.isConfirm = true

    return res.status(200).json({
      message: 'Ви підтвердили свою пошту',
      session,
      confirmationCode,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

// ================================================================

router.get('/signin', function (req, res) {
  return res.render('login', {
    name: 'login',
    title: 'Login page',
  })
})

//====================

router.post('/signin', function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email не існує',
      })
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: 'Помилка. Пароль не підходить',
      })
    }

    if(!user.isConfirm) {
      return res.status(403).json({
        message: 'Ви не підтвердили свою пошту.'
      })
    }

    const id = Number(user.id)

    return res.status(200).json({
      message: 'Ви увійшли',
      id,
    })
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    })
  }
})

// ================================================================

router.get('/recovery', function (req, res) {
  return res.render('login', {
    name: 'login',
    title: 'Login page',
    data: {},
  })
})

//====================

router.post('/recovery', function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: 'Користувач з таким email не існує',
      })
    }

    const confirmationCode = Confirm.create(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
      confirmationCode,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//=======================================================================

router.get('/recovery-confirm', function (req, res) {
  return res.render('login', {
    name: 'login',
    title: 'Login page',
    data: {},
  })
})

//====================

router.post('/recovery-confirm', function (req, res) {
  const { password, confirmationCode } = req.body

  if (!confirmationCode || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(confirmationCode))

    if (!email) {
      return res.status(400).json({
        message: 'Код не існує',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(401).json({
        message: 'Користувач з таким email не існує',
      })
    }

    user.password = password

    if(!user.isConfirm){
      return res.status(403).json({
        message: 'Password was change, but user is not Confirm',
      })
    } else {

      return res.status(200).json({
        message: 'Пароль змінено',
        user,
      })
    }   
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//=======================================================================

// Експортуємо глобальний роутер
module.exports = router