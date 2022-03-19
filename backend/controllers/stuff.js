/*
const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

*/

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
  pool.query("SELECT firstname_student FROM student WHERE id_student ="+id, (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getavis = (req,res) => {
  pool.query("SELECT * FROM avis", (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const getoneAvis = (req,res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM avis WHERE id_avis ="+id, (error,results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
  });
};

const createAvis = (req, res) => {
    const ida = req.body.ida;
    const avis = req.body.avis;
    const date = req.body.date;
    const ids = req.body.ids;
    const idc = req.body.idc;
    const note = req.body.note;
    pool.query('INSERT INTO avis (id_avis, text_avis, date_avis, fk_student, fk_company, note_avis) VALUES ($1, $2, $3, $4, $5, $6)', [ida, avis,date,ids,idc,note], (error,results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`idavis added: ${ida}`);
  });
};

const createCompany = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  pool.query('INSERT INTO company (id_company, name_company) VALUES ($1, $2)', [id, name], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`company added: ${name}`)
  })
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


const getconditions = (req, res) => {
  const speciality = 1;
  const university = 1;
  pool.query("SELECT * FROM avis, student WHERE id_student = fk_student AND fk_speciality ="+speciality+"AND fk_university ="+university, (error,results) => {
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

const getAvisofoneStudent = (req,res) => {
  const id = Number(req.params.id)
  pool.query("SELECT * FROM avis WHERE fk_student ="+id, (error,results) => {
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
  pool.query("SELECT text_avis as avistext, fk_company as value,note_avis as note,title_avis as title FROM avis WHERE fk_student ="+id+" AND id_avis ="+idavis, (error,results) => {
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
  pool.query(" UPDATE avis SET text_avis ='"+avis+"',title_avis='"+titre+"', note_avis="+note+" WHERE id_avis ="+idavis+"AND fk_student ="+id, (error,results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`avis modify: ${idavis}`);
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



module.exports = {
    getStudents,
    getoneStudent,
    getavis,
    getoneAvis,
    createAvis,
    createCompany,
    createStudent,
    loginStudent,
    getavisOfStudent,
    getconditions,
    getCompany,
    getAvisofoneStudent,
    getoneAvisofoneStudent,
    modifyAvis,
    getStudentsemail,
    getuniversity,
    getspeciality,
};