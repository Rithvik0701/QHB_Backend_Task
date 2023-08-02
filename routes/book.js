const express = require('express')
const {getBook,addBook,updateBook,deleteBook,} = require('../controllers/book');
const router = express.Router()

router.get("/getbook", getBook);
router.post("/addbook", addBook);
router.post("/updatebook", updateBook);
router.post("/deletebook", deleteBook);
// 
module.exports = router