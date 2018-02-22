let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParse = require('body-parser');
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1',
    database : 'CRUDBook'
});

/*connection.query('CREATE DATABASE CRUDBook', (err) => {
   if(err) throw err;
   connection.query('USE CRUDBook', (err) => {
       if(err) throw err;
       connection.query('create table Book ('
           + "id int not null primary key auto_increment,"
           + "title nvarchar(40) not null ,"
           + "author nvarchar(40) not null,"
           + "pubLister text,"
           + "price float"
           + ')', (err) => {
           if(err) throw err;
       });
   })
});*/
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

app.get('/user', (req,res) => {
    connection.query("select * from Book", (err, result) => {
        if(err) throw err;
        res.send(result);
        //res.send(result[1].author);
    });
});

/*app.get('/user/:title', (req,res) => {
   connection.query("select * from Book where title =?", req.param('title'), (err, result) => {
       if(err) throw err;
       res.send(result);
       //res.send(result[1].author);
   });
});*/
/*app.post('/', (req, res) => {
    connection.query('insert into Book values (NULL, "Dragon Ball Z", "Akira Toriyama", "Japan", NULL)',
        (err) => {
        if(err) throw err;
        res.send('User added to database');
    });
});*/

app.post('/', (req, res) => {
    connection.query('insert into Book set ?', req.body,
        (err) => {
            if(err) throw err;
            res.send('User added to database');
        });
});

app.put('/user/update', (req, res) => {
   connection.query('update Book set price ="1000" where id="3"', (err) => {
       if(err) throw err;
       res.send("Success!");
   });
});

app.delete('/user/:id', (req, res) => {
    connection.query('delete from Book where id=?', req.param('id'), (err) => {
        if(err) throw err;
        res.send('Success!');
    });
});
/*app.delete('/user/delete', (req, res) => {
   connection.query('delete from Book where id="3"', (err) => {
       if(err) throw err;
       res.send('Success!');
   });
});*/
app.listen(3000, () => {
    console.log("Sever running");
});