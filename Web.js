const express = require('express');
const fs = require('fs');

const app = express();
const commonPasswords = fs.readFileSync('10-million-password-list-top-100.txt', 'utf8').split('\n');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

function verifyPassword(password) {
  // Implement password verification based on OWASP Top 10 Proactive Controls C6 requirements
  // You can customize this function according to your specific password requirements
  if (password.length < 8) {
    return false;
  }

  if (commonPasswords.includes(password)) {
    return false;
  }

  return true;
}

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  const password = req.body.password;

  if (verifyPassword(password)) {
    res.render('welcome', { password });
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});