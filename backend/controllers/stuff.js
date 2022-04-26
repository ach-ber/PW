
const pool = require('../models/Thing');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const getavis = (req,res) => {
  pool.query("SELECT * FROM avis", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getBestAvis = (req,res) => {
  pool.query("SELECT * FROM avis,company  where fk_company = id_company ORDER BY note_avis DESC FETCH FIRST 5 ROWS ONLY;", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getRecentAvis = (req,res) => {
  pool.query("SELECT * FROM avis,company  where fk_company = id_company ORDER BY date_avis DESC FETCH FIRST 5 ROWS ONLY;", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};


const getoneAvis = (req,res) => {
  const idavis = Number(req.params.idavis);
  pool.query('SELECT text_avis,date_avis,title_avis,name_company,name_speciality, name_university ,email_student,note_avis FROM avis,company,speciality,student,university where fk_university = id_university and fk_company = id_company and fk_speciality = id_speciality and fk_student = id_student and id_avis = $1;',[idavis], (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getavisSorted = (req, res) => {
  const speciality = Number(req.params.idspec);
  const university = Number(req.params.iduniv);
  pool.query('SELECT id_avis,text_avis, date_avis,note_avis,title_avis,name_company FROM avis,company,student WHERE id_student = fk_student and id_company = fk_company  AND fk_speciality = $1  AND fk_university =$2 order by note_avis desc;', [speciality,university],(error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getAvisofoneStudent = (req,res) => {
  const id = Number(req.params.id)
  pool.query("SELECT * FROM avis,company  where fk_company = id_company and fk_student = $1",[id], (error,results) => {
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
  pool.query("SELECT text_avis as avistext, date_avis as date,note_avis as note,title_avis as title FROM avis WHERE fk_student = $1 AND id_avis = $2",[id,idavis], (error,results) => {
      if (error) throw error;
      if (results.rows == '') {
        return res.status(404).send('Aucun avis trouvé pour cet étudiant et cet idavis !');
      }
      else {
        res.status(200).json(results.rows);
      }
  });
};

const getStudents = (req,res) => {
  pool.query("SELECT * FROM student", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getoneStudent = (req,res) => {
  const id = Number(req.params.id);
  pool.query("SELECT firstname_student,lastname_student, email_student FROM student WHERE id_student = $1",[id], (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getCompany = (req, res) => {
  pool.query("select id_company as value, name_company as label from company", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getStudentsemail = (req, res) => {
  pool.query("select email_student as email from student", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getuniversity = (req, res) => {
  pool.query("select id_university as value, name_university as label from university", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getspeciality = (req, res) => {
  pool.query("select id_speciality as value, name_speciality as label from speciality", (error,results) => {
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

const createAvis = (req, res) => {
  const avis = req.body.avis;
  const date = req.body.date;
  const ids = req.body.ids;
  const idc = req.body.idc;
  const note = req.body.note;
  const title = req.body.title;
  pool.query('INSERT INTO avis ( text_avis, date_avis, fk_student, fk_company, note_avis, title_avis) VALUES ($1, $2, $3, $4, $5,$6)', [ avis,date,ids,idc,note,title], (error,results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`idavis added: ${ids}`);
});
};

const createCompany = (req, res) => {
const name = req.body.name;
pool.query('INSERT INTO company (name_company) VALUES ($1)', [name], (error, results) => {
  if (error) {
    throw error
  }
  res.status(201).send(`company added: ${name}`)
})
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



/* --------------------------------------- */

// modif getoneAvis => param idavis
// modif getavisofonestudent
// modif getoneAvisofoneStudent
// modif getoneStudent => param id







/*
const getavisOfStudent = (req,res) => {
  pool.query("SELECT * FROM avis", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};


const getuniversityAvis = (req, res) => {
  pool.query("select distinct id_university as value, name_university as label from university, avis, student where fk_university = id_university and id_student = fk_student;", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};



const getspecialityAvis = (req, res) => {
  const iduniversity = Number(req.params.iduniversity);
  pool.query("select distinct id_speciality as value, name_speciality as label from speciality, avis, student where fk_speciality = id_speciality and id_student = fk_student and fk_university ="+iduniversity, (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};
*/


module.exports = {
    getStudents,
    getoneStudent,
    getavis,
    getoneAvis,
    createAvis,
    createCompany,
    createStudent,
    loginStudent,
    //getavisOfStudent,
    getavisSorted,
    getCompany,
    getAvisofoneStudent,
    getoneAvisofoneStudent,
    modifyAvis,
    getStudentsemail,
    getuniversity,
    getspeciality,
    getBestAvis,
    getRecentAvis,
    //getuniversityAvis,
    //getspecialityAvis,
    deleteAvis,
};