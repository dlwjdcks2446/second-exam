const pool = require('./_dbPool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);


const myPage = (req,res) => {
    let sql = `SELECT * FROM users WHERE id='${req.session.user.id}'`;
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        res.render('auth/myPage.html', {user: req.session.user, row: rows[0]});
    })
    
}

const edit = (req, res)=>{
    let sql = `SELECT pw FROM users WHERE id='${req.session.user.id}';`
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        if(rows[0].pw === req.body.pw){
            let sql = `UPDATE users SET email=? WHERE id=?;`
            let values = [req.body.email, req.session.user.id];
            pool.query(sql, values, (err, rows, fields)=>{
                if(err) throw err;
                res.render('message.html', {message:'업데이트 되었습니다.', user:req.session.user});
            })
        }
        else{
            res.render('message.html', {message:'비밀번호가 틀렸어ㅋㅋ', user:req.session.user});
        }
    })
    
}

// const signOut = (req, res)=>{ 
//   req.session.destroy();
//   res.redirect('/');
// }


module.exports = {
    myPage,
    edit,
    // signOut,
}