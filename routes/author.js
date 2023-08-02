const express = require('express')
const { addAuthor, updateAuthor,getAuthorById, deleteAuthor, getAuthor , generatePDF} = require('../controllers/author');
const router = express.Router()

router.get("/getauthor", getAuthor);
router.get("getauthorbyID/:id", getAuthorById);
router.post("/addauthor", addAuthor);
router.post("/updateauthor", updateAuthor);
router.post("/deleteauthor", deleteAuthor);
router.get("/generate-pdf",generatePDF);

module.exports = router;

/**
 * @dev function to make a contract to add two numbers
 * @param {number} a number 
 * @param {number} b number
 * @returns {number} sum of two numbers
 */