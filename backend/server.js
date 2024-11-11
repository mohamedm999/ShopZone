const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const FILE_NAME = path.join(__dirname , 'ProductData.json') 


app.get('/get-products', (req, res) => {
    fs.readFile(FILE_NAME, (err , data) => {
    
        if (err){
            res.status(500).json({ error: 'this is an error' })
            return
        }
        res.json(JSON.parse(data))
    })
});

app.post('/addCategory', (req, res) => {

    // const newCategory = req.body; 
   
 
    fs.readFile('ProductData.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error reading file' });
      }

      const categories = JSON.parse(data);

      const newId = categories[categories.length - 1 ].id + 1 ;

      const newCategory  = Object.assign({id:newId},req.body) ;
  

      categories.push(newCategory);
  
      fs.writeFile(FILE_NAME, JSON.stringify(categories, null, 2), 'utf8', (err) => {
          if (err) {
            return res.status(500).send("Error saving data");
          }
          res.status(200).send("Category added successfully!");
      });
    });
  });

app.listen(PORT,  () => {
    console.log(`its lestning to the http://localhost:${PORT}`)
})
