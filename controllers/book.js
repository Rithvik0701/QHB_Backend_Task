const express = require('express');
const client = require('../database');
const e = require('express');

exports.getBook = (req, res) => {
    
        client.query(`SELECT * FROM books;`)
        .then((data) => {
    
            console.log(data);
            res.status(200).send(data.rows)
    
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Error Getting Book"
            })
            
        })
}

exports.addBook = (req, res) => {
    
        client.query(`INSERT INTO books (title,author_id) VALUES ('${req.body.title}','${req.body.author_id}');`)
        .then((data) => {
    
            console.log(data);
            res.status(200).json({
                message: "Book Added Successfully"
            });
    
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Error Adding Book"
            })
            
        })
}
    
exports.updateBook = (req, res) => {
        
            client.query(`UPDATE books SET title='${req.body.title}' WHERE id=${req.body.id};`)
            .then((data) => {
        
                console.log(data);
                res.status(200).json({
                    message: "Book Updated Successfully"
                });
        
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: "Error Updating Book"
                })
                
            })
}

exports.deleteBook = (req, res) => {
                
                    client.query(`DELETE FROM books WHERE id=${req.body.id};`)
                    .then((data) => {
                
                        console.log(data);
                        res.status(200).json({
                            message: "Book Deleted Successfully"
                        });
                
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            message: "Error Deleting Book"
                        })
                        
                    })
}
    

    
    
