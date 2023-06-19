const pool = require('./_dbPool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);


const signIn = (req,res)=> {
  if(req.session.user === undefined)
    res.render('auth/signIn.html');
  else
    res.redirect('/');
}

const signUp = (req, res)=> {
  if(req.session.user === undefined)
    res.render('auth/signUp.html');
  else
    res.redirect('/');
}

const signUpProcess = (req, res)=>{
  let sql = `SELECT id, email, nick FROM users WHERE id = '${req.body.id}' AND email = '${req.body.email}' AND nick = '${req.body.nick}'`;
  pool.query(sql, (err, rows, fields)=>{
    if(err) throw err;
    if(rows.length === 0){
      let sql = `INSERT INTO users (id, email, nick, pw, joinDate, lastLogin, tier) VALUES (?,?,?,?,?,?,?)`;
      let values = [req.body.id, req.body.email, req.body.nick, req.body.pw,  getDateTime(new Date()), getDateTime(new Date()), '돌'];
      pool.query(sql, values, (err, rows, fields)=>{
        if(err) err;
        res.render('auth/signIn.html');
        console.log('회원가입완료');
      })
    }
    else
      res.redirect('/');
  })
}

const signInProcess = (req, res)=>{
  let sql = `SELECT id, email, pw, nick FROM users WHERE id=? and pw=?`;
  let values = [req.body.account, req.body.pw];
  pool.query(sql, values, (err, rows, fields)=>{
    if(err) throw err;
    if(rows.length !== 0){
      req.session.user = {id : rows[0].id, name:rows[0].nick};
      res.redirect('/')
    }
    else
      res.render('auth/signIn.html');
  })
}

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

const withdrawal = (req, res) => {
  let sql = `DELETE FROM users WHERE email='${req.body.email}'`;
  pool.query(sql, (err) => {
    if (err) throw err;
    req.session.destroy()
    res.redirect('/');
  })
}


module.exports = {
  signIn,
  signUp,
  signUpProcess,
  signInProcess,
  signOut,
  withdrawal,
}