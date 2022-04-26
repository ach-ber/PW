const pool = require('../models/Thing');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const getavis = (req,res) => {
    pool.query("SELECT * FROM avis", (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getoneAvis = (req,res) => {
    const idavis = Number(req.params.idavis);
    pool.query("SELECT text_avis,date_avis,title_avis,name_company,name_speciality, name_university ,email_student,note_avis FROM avis,company,speciality,student,university where fk_university = id_university and fk_company = id_company and fk_speciality = id_speciality and fk_student = id_student and id_avis = $1", [idavis],(error,results) => {
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

const getconditions = (req, res) => {
    const speciality = Number(req.params.idspec);
    const university = Number(req.params.iduniv);
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
  
const getuniversityAvis = (req, res) => {
    pool.query("select distinct id_university as value, name_university as label from university, avis, student where fk_university = id_university and id_student = fk_student;", (error,results) => {
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
  
const getspecialityAvis = (req, res) => {
    const iduniversity = Number(req.params.iduniversity);
    pool.query("select distinct id_speciality as value, name_speciality as label from speciality, avis, student where fk_speciality = id_speciality and id_student = fk_student and fk_university ="+iduniversity, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getavis,
    getoneAvis,
    createAvis,
    createCompany,
    getconditions,
    getCompany,
    getStudentsemail,
    getuniversity,
    getspeciality,
    getBestAvis,
    getRecentAvis,
    getuniversityAvis,
    getspecialityAvis,

};