const pool = require('../models/Thing');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getStudents = (req,res) => {
    pool.query("SELECT * FROM student", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getoneStudent = (req,res) => {
  const id = req.params.id;
  pool.query("SELECT firstname_student,lastname_student, email_student FROM student WHERE id_student ="+id, (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};


const createStudent = (req, res) => {
  
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const speciality = req.body.speciality;
    const university = req.body.university;
    const email = req.body.email;
    const password = bcrypt.hash(req.body.password, 10);
  
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const password = hash;
        pool.query('INSERT INTO student ( firstname_student, lastname_student, fk_university, fk_speciality,email_student,passhash_student) VALUES ($1,$2,$3,$4,$5,$6)', 
        [firstname,lastname,university,speciality,email,password], (error, results) => {
          if (error) {
            throw error
          }
          res.status(201).send(`student added: ${email}`)
      })
    }).catch(error => res.status(500).json({ error }));
};
  
  
const loginStudent = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query('SELECT * FROM student WHERE email_student = $1',[email], (error, results) => {
      if (error) {
        throw error
      };
      if (results.rows == '') {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      else {
        // return res.status(201).send(results.rows[0].passhash_student)
        bcrypt.compare(password, results.rows[0].passhash_student)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: results.rows[0].id_student,
            token: jwt.sign(
              { userId: results.rows[0].id_student },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '1h' }
            )
            });
        })
      }
    });
};
  
const getavisOfStudent = (req,res) => {
    pool.query("SELECT * FROM avis", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


const getAvisofoneStudent = (req,res) => {
    const id = Number(req.params.id)
    pool.query("SELECT * FROM avis,company  where fk_company = id_company and fk_student ="+id, (error,results) => {
        if (error) throw error;
        if (results.rows == '') {
          return res.status(404).send('Aucun avis trouvé pour cet étudiant!');
        }
        else {
          res.status(200).json(results.rows);
        }
    });
  };
  
const getoneAvisofoneStudent = (req,res) => {
    const id = Number(req.params.id);
    const idavis = Number(req.params.idavis);
    pool.query("SELECT text_avis as avistext, date_avis as date,note_avis as note,title_avis as title FROM avis WHERE fk_student ="+id+" AND id_avis ="+idavis, (error,results) => {
        if (error) throw error;
        if (results.rows == '') {
          return res.status(404).send('Aucun avis trouvé pour cet étudiant et cet idavis !');
        }
        else {
          res.status(200).json(results.rows);
        }
    });
  };
  
const modifyAvis = (req, res) => {
    const id = Number(req.params.id);
    const idavis = Number(req.params.idavis);
    const avis = req.body.text;
    const titre = req.body.title;
    const note = req.body.note;
    const date = req.body.date;
    pool.query('UPDATE avis SET text_avis = $1, title_avis= $2, note_avis= $3, date_avis= $4 WHERE id_avis = $5 AND fk_student = $6',[avis,titre,note,date,idavis,id] ,(error,results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`avis modify: ${idavis}`);
  });
};
  
const deleteAvis = (req, res) => {
    const id = Number(req.params.id);
    const idavis = Number(req.params.idavis);
    pool.query(" DELETE FROM avis WHERE id_avis ="+idavis+"AND fk_student ="+id, (error,results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`avis delete : ${idavis}`);
    });
};

module.exports = {
    getStudents,
    getoneStudent,
    createStudent,
    loginStudent,
    getavisOfStudent,
    getAvisofoneStudent,
    getoneAvisofoneStudent,
    modifyAvis,
    deleteAvis,
};
  
  
  
