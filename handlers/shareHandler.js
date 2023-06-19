const pool = require('./_dbPool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const study_list = (req, res)=>{
  let sql = `SELECT * FROM study;`;
  let values = [];
  pool.query(sql, (err, rows, fields)=>{
    if(err) throw err;
    res.render('study/studyingList.html', {user:req.session.user, sub:rows});
  })
}

const music_list = (req, res)=>{
  let sql = `SELECT * FROM playlist;`;
  let values = [];
  pool.query(sql, (err, rows, fields)=>{
    if(err) throw err;
    res.render('music/playList.html', {user:req.session.user, sub:rows});
  })
}

const search = (req, res)=>{
  let sql = `SELECT * FROM study WHERE subject_name='${req.query.search}'`;
  let values = [];
  pool.query(sql, (err, rows, fields)=>{
    if(err) throw err;
    res.render('study/studyingList.html', {user:req.session.user, sub:rows});
  })
}

const train = (req, res)=>{
  res.send('Train Hard');
}

const study_regist = (req, res)=>{
  res.render('study/study_regist.html', {user:req.session.user});
}

const music_regist = (req, res)=>{
  res.render('music/music_regist.html', {user:req.session.user});
}

const study_registProcess = (req, res)=>{
  let sql = `INSERT INTO study (id, subject_name, precontent, content, joinDate) VALUES (?,?,?,?,?);`
  let values = [req.session.user.id, req.body.subject, req.body.precontent, req.body.content, getDateTime(new Date())];
  pool.query(sql, values, (err, rows, fields)=>{
    if(err) throw err;
    res.render('message.html', {message:'등록됨', user:req.session.user});
  })
}


const music_registProcess = (req, res)=>{
  let sql = `INSERT INTO playlist (id, music_name, singer, joinDate) VALUES (?,?,?,?);`
  let values = [req.session.user.id, req.body.title, req.body.singer, getDateTime(new Date())];
  pool.query(sql, values, (err, rows, fields)=>{
    if(err) throw err;
    res.render('message.html', {message:'등록됨', user:req.session.user});
  })
}

const PersonalSubject = (req, res)=>{
  let sql = `SELECT * FROM study WHERE idStudys = '${req.params.subject}'`;
  let values = [];
  pool.query(sql, (err, rows, fields)=>{
    if(err) throw err;
    res.render('study/personalStudy.html',{row:rows[0], user:req.session.user});
  })
}



module.exports = {
  study_list,
  music_list,
  search,
  train,
  study_regist,
  music_regist,
  study_registProcess,
  music_registProcess,
  PersonalSubject,
}