const e = require('express');
const client = require('../database');
const PDFDocument = require('pdfkit');
const { Table } = require('pdfkit-table');
const fs = require('fs');
const blobStream = require('blob-stream');
const path = require('path');

exports.getAuthor = (req, res) => {

    client.query(`SELECT * FROM authors;`)
    .then((data) => {

        console.log(data);
        res.status(200).send(data.rows);

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error Getting Author"
        })
        
    })
}

exports.getAuthorById = (req, res) => {
    
        console.log(req.params);

        // client.query(`SELECT * FROM authors WHERE id=${req.param.id};`)
        // .then((data) => {
    
        //     console.log(data);
        //     res.status(200).send(data.rows);
    
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).json({
        //         message: "Error getting Author"
        //     })
            
        // })
}
    
exports.addAuthor = (req, res) => {

    console.log(req.body);
    res.send(req.body);
    client.query(`INSERT INTO authors (name,email) VALUES ('${req.body.name}','${req.body.email}');`)
    .then((data) => {

        console.log(data);
        res.status(200).send({
            message: "Author Added Successfully"
        });

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Error Adding Author"
        })
        
    })
}

exports.updateAuthor = (req, res) => {
    
        client.query(`UPDATE authors SET name='${req.body.name}',email='${req.body.email}' WHERE id=${req.body.id};`)
        .then((data) => {
    
            console.log(data);
            res.status(200).json({
                message: "Author Updated Successfully"
            });
    
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Error Updating Author"
            })
            
        })
}

exports.deleteAuthor = (req, res) => {
        
            client.query(`DELETE FROM authors WHERE id=${req.body.id};`)
            .then((data) => {
        
                console.log(data);
                res.status(200).json({
                    message: "Author Deleted Successfully"
                });
        
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: "Error Deleting Author"
                })
                
            })
}

exports.generatePDF = (req, res) => {


    client.query(`SELECT * FROM authors;`)
        .then((data) => {
       const  authors = data.rows; 

       const doc = new PDFDocument();
       const stream = doc.pipe(blobStream());
       doc.pipe(fs.createWriteStream('all_authors.pdf')); // Save the PDF to a file named 'all_authors.pdf'
     
       // Embed a font, set the font size, and render some text
doc
    .font('fonts/PalatinoBold.ttf')
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);


  const table = new Table(doc, {
    bottomMargin: 30,
  });

  table
    .addPlugin(new Table(table, { bottomMargin: 30 }))
    .setHeaders(['Name', 'Email'])
    .setData(authors.map((author) => [author.name, author.email]))
    .setWidths([200, 200])
    .setAligns(['left', 'left'])
    .setBorder(true)
    .draw();

            
  doc.end();

  stream.on('finish', function() {
    // get a blob you can do whatever you like with
    const blob = stream.toBlob('application/pdf');
  
  });
            
  const filePath = path.join(__dirname, '../all_authors.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="all_authors.pdf"');
  fs.createReadStream(filePath).pipe(res);
    })
    

}
    
    