// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { Notification } = require('../class/notification')
const { Transaction } = require('../class/transaction')
const { Balance } = require('../class/balance')
const { User } = require('../class/user')

//=======================================================================

router.get('/balance', (req, res) => {
    return res.render('balance', {
        name: 'balance',
        title: 'Balance page',
      })
});

//========================

router.post('/balance', (req, res) => {
    try {
        const transactions = Transaction.getList();
        const newBalance = new Balance(transactions);
        const currentBalance = newBalance.getBalance();
        const numberBalance = Number(currentBalance);
        console.log('Balance: ', numberBalance);
        return res.status(200).json({ 
            message: "Balance = success",
            balance: numberBalance,
            transactions: transactions,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Помилка при отриманні балансу' });
    }
})

//=======================================================================

router.get('/receive', (req, res) => {
    return res.render('recive', {
        name: 'recive',
        title: 'Recive page',
      })
});

//========================

router.post('/receive', (req, res) => {
    try {
        const { value, paymentSystem  } = req.body;

        if(!value || !paymentSystem) {
            return res.status(400).json({message: "Помилка. Не хватає даних"})
        }

        if(paymentSystem === 'Stripe' || paymentSystem === 'Coinbase') {
            const transaction = Transaction.create({ 
                sum: value, 
                transType: "Receipt", 
                type: 'increment', 
                paymentSystem: paymentSystem 
            })

      

            const notification = Notification.create({
                name: 'New reward system',
                type: "Announcement",
            });
            
            // console.log('Receive notification: ', notification)

            const balance = new Balance(transaction);

            return res.status(200).json({ 
                message: `Трансакція ${paymentSystem} успішно створена`,
                balance: balance.balance,
                transaction: transaction,
            })
        } else {
            return res.status(400).json({ message: 'Непідтримувана платіжна система' });
        } 
        
    } catch (error) {
        return res.status(500).json({ message: 'Помилка.' });
    }
})

//=======================================================================

router.get('/send', (req, res) => {
    return res.render('send', {
        name: 'send',
        title: 'Send page',
      })
});

//========================

router.post('/send', (req, res) => {
    try {
        const { value, paymentSystem, sendingEmail  } = req.body;
        const transactions = Transaction.getList();
        const newBalance = new Balance(transactions);
        const currentBalance = newBalance.getBalance();

        if(!value || !paymentSystem || !sendingEmail) {
            return res.status(400).json({message: "Помилка. Не хватає даних"})
        }

        if(Number(currentBalance) < Number(value)) {
            return res.status(400).json({ 
                message: `На рахунку недостатньо коштів. Ваш баланс: ${currentBalance}`,
            });

        } else {
            const transaction = Transaction.create({ 
                sum: value, 
                transType: sendingEmail, 
                type: 'decrement', 
                paymentSystem: paymentSystem 
            })

            const notification = Notification.create({
                name: 'New sending system',
                type: "Announcement",
            });

            return res.status(200).json({ 
                message: `Трансакція ${paymentSystem} успішно створена`,
            })
        } 
        
    } catch (error) {
        return res.status(500).json({ message: 'Помилка.' });
    }
})

//=======================================================================

router.get('/transaction/:transactionId', (req, res) => {
    const transactionId = req.params.transactionId;

    try {
        const transaction = Transaction.getById(transactionId);
        
        return res.status(200).json({ 
            transaction: transaction,
        })
    } catch (er) {
        return res.status(500).json({ message: 'Помилка.' });
    }
    
});

//=======================================================================

router.get('/notifications', (req, res) => {
    try {
        const notifications = Notification.getList();

        return res.status(200).json({ 
            notifications: notifications,
        })
    } catch (er) {
        return res.status(500).json({ message: 'Помилка.' });
    }
    
});

//=======================================================================

router.get('/settings-email', (req, res) => {
    return res.render('settings-email', {
        name: 'settings-email',
        title: 'Settings page',
      })
});

//========================

router.post('/settings-email', (req, res) => {
    try{
        const { newEmail, password, id } = req.body

        const user = User.getById(id)

        if(user.password === password) {
            user.email = newEmail

            const notification = Notification.create({
                name: 'Email was changed',
                type: "Warning",
            });

            return res.status(200).json({
                message: 'Емаіl успішно змінено',
                user: user,
            });

        } else {
            return res.status(400).json({
                message: 'Пароль не вірний',
            });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Помилка.' })
    }
});

//=======================================================================

router.get('/settings-password', (req, res) => {
    return res.render('settings-password', {
        name: 'settings-password',
        title: 'Settings page',
      })
});

//========================

router.post('/settings-password', (req, res) => {
    const { id, oldPassword, newPassword } = req.body

    try{
        const user = User.getById(id)

        if(user.password === oldPassword) {
            user.password = newPassword
        
            const notification = Notification.create({
                name: 'Password was changed',
                type: "Warning",
            });
        
            return res.status(200).json({
                message: 'Password успішно змінено',
                user: user,
            });

        } else {
            return res.status(400).json({
                message: 'Пароль не вірний',
            });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Помилка.' })
    }
});

//=======================================================================

// Експортуємо глобальний роутер
module.exports = router