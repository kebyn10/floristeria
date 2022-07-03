const express = require('express')
const app = express()
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/floristeria.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const sessions = require('express-session');
const url = require('url');
const querystring = require('querystring');

const timeEXp = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "rndnsdgnednfeubawejbsjvbsdjfbsdjhvjzedakalicamillesdjhdsfhjsdfsdhfshjfs",
  saveUninitialized: true,
  cookie: {
    maxAge: timeEXp
  },
  resave: false
}));






const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'aquaflorfloristeria@gmail.com',
    pass: 'gpslrucbfmxnjxuk'
  }
});

conectado = false


app.get('/', (req, res) => {
  session = req.session;
  if (session.userid) {
    conectado = true
    if (conectado == true) {
      return res.render('index', {
        nombre: session.usernom
      })
    }

  }
  res.render('index');


})
app.get('/creado', (req, res) => {
  res.render('cargadoexito')
})

app.get('/eliexito', (req, res) => {
  res.render('eliminadoexito')
})

app.get('/nocarga', (req, res) => {
  res.render('nosepudieroncargar')
})

app.get('/info', (req, res) => {
  res.render('info')
})

app.get('/crearprodu', (req, res) => {
  res.render('crearprodu')
}) 

app.get('/admin1cliente', (req, res) => {
  res.render('admin1cliente')
})
app.get('/admin3cliente', (req, res) => {
  res.render('admin3cliente')
})
app.get('/admin4cliente', (req, res) => {
  res.render('admin4cliente')
})

app.get('/eliminarme', (req, res) => {
  res.render('eliminarme')
})


app.get('/cambiarcontra', (req, res) => {
  res.render('cambiarcontra')
})

app.get('/buscarprodu', (req, res) => {
  res.render('buscarprodu')
})
app.get('/actualizarprodu', (req, res) => {
  res.render('actualizarprodu')
})
app.get('/admin3cliente', (req, res) => {
  res.render('admin3cliente')
})

app.get('/eliminarprodu', (req, res) => {
  res.render('eliminarprodu')
})

app.get('/regis', (req, res) => {
  res.render('registrarse')
})


app.get('/adminajustes', (req, res) => {
  res.render('adminajustes')
})

app.get('/login', (req, res) => {
  res.render('iniciose')
})

app.get('/cata', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('catalogo', {
        tt
      });

    }

  })
})



app.get('/amoramistad', (req, res) => {

  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('1') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('amoramistad', {
        tt
      });

    }

  })
})
app.get('/boda', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('2') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('boda', {
        tt
      });

    }

  })
})
app.get('/cumple', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('3') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('cumple', {
        tt
      });

    }

  })
})
app.get('/diahombre', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('4') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('diahombre', {
        tt
      });

    }

  })
})
app.get('/diamadre', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('5') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('diamadre', {
        tt
      });

    }

  })
})
app.get('/diamujer', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('6') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('diamujer', {
        tt
      });

    }

  })
})
app.get('/diapadre', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('7') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('diapadre', {
        tt
      });

    }

  })
})
app.get('/grados', (req, res) => {
  db.all("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE categoria in ('8') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('grados', {
        tt
      });

    }

  })
})
app.post('/infoproducto', (req, res) => {
  let cod_referencia = req.body.cod_referencia;
  db.get("SELECT cod_referencia,nombre,categoria,valor,imagen FROM PRODUCTO WHERE $cod_referencia=cod_referencia  ", {
    $cod_referencia: cod_referencia
  }, (error, row) => {

    if (!error) {


      res.render('informacionprodu', {
        data: [{
          cod_referencia: row.cod_referencia,
          nombre: row.nombre,
          categoria: row.categoria,
          valor: row.valor,
          imagen: row.imagen
        }]
      });

    }
    if (error) {
      console.log(error);
    }
  })
})


app.post('/infocliente', (req, res) => {
  let email = req.body.email;
  db.get("SELECT name, id, number, email FROM cliente WHERE $email=email  ", {
    $email: email
  }, (error, row) => {

    if (!error) {


      res.render('info', {
        data: [{
          email: row.email,
          nombre: row.name,
          id: row.id,
          number: row.number,

        }]
      });

    }
    if (error) {
      console.log(error);
    }
  })
})


app.get('/minfo', (req, res) => {
  email = req.session.userid;
  db.get("SELECT name, id, number, email FROM cliente WHERE $email=email  ", {
    $email: email
  }, (error, row) => {

    if (!error) {


      res.render('info', {
        data: [{
          email: row.email,
          nombre: row.name,
          id: row.id,
          number: row.number,

        }]
      });

    }
    if (error) {
      console.log(error);
    }
  })
})



app.get('/error', (req, res) => {
  res.render('error')
})
app.get('/ajustes', (req, res) => {

  res.render('ajustes')

})
app.get('/actualizarme', (req, res) => {

  res.render('actualizarme')

})
app.get('/usuarioexiste', (req, res) => {

  res.render('usuarioexiste')

})



app.post('/registro', (req, res) => {
  let name = req.body.name;
  let id = req.body.id;
  let number = req.body.number;
  let email = req.body.email;
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  db.run(`INSERT INTO cliente(name, id, number, email, password) VALUES(?, ?, ?, ?, ?)`,
    [name, id, number, email, hash],
    function (error) {
      if (!error) {
        console.log("Insert OK");
        res.redirect('/login')
         transporter.sendMail({
    from: 'aquaflorfloristeria@gmail.com',
    to: email,
    subject: 'Test Email Subject',
    html: '<img src="https://res.cloudinary.com/dwczm63h6/image/upload/v1654784841/floristeria%20aqua/Tarjeta_de_Visita_Una_Cara_Vertical_Profesional_Morado_y_Rosa_pdmiwk.png" alt="">'
  }).then((res) =>{console.log(res);}).catch((err) => {console.log(err);})
      } else {
        console.log("Insert error", error.code);
        if (error.code == "SQLITE_CONSTRAINT") {
          return res.render('usuarioexiste')
        }
        return res.render('Haocurridounerror')
      }
    }
  );




})



app.post('/crearusu', (req, res) => {
  let name = req.body.name;
  let id = req.body.id;
  let number = req.body.number;
  let email = req.body.email;
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  db.run(`INSERT INTO cliente(name, id, number, email, password) VALUES(?, ?, ?, ?, ?)`,
    [name, id, number, email, hash],
    function (error) {
      if (!error) {
        console.log("Insert OK");

         transporter.sendMail({
    from: 'aquaflorfloristeria@gmail.com',
    to: email,
    subject: 'Test Email Subject',
    html: '<img src="https://res.cloudinary.com/dwczm63h6/image/upload/v1654784841/floristeria%20aqua/Tarjeta_de_Visita_Una_Cara_Vertical_Profesional_Morado_y_Rosa_pdmiwk.png" alt="">'
  }).then((res) =>{console.log(res);}).catch((err) => {console.log(err);})
        res.send('creado correctamente')
      } else {
        console.log("Insert error", error.code);
        if (error.code == "SQLITE_CONSTRAINT") {
          return res.render('usuarioexiste')
        }
        return res.render('Haocurridounerror')
      }
    }
  );
})
app.post('/logica', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  if (email == "000zed@flores.aqua" && password == "akali") {

    return res.redirect('/adminajustes');
  } else {
    db.get("SELECT password,name  FROM cliente WHERE email=$email", {
      $email: email
    }, (error, row) => {
      if (error) {
        return res.render("Haocurridounerror")
      }
      if (row) {
        console.log(row.password);
        if (bcrypt.compareSync(password, row.password)) {
          session = req.session;

          session.userid = email;
          session.usernom = row.name;
          return res.redirect('/');

        }
        return res.render("error");
      }
      return res.render("error");
    });

  }

})

app.post('/eliminarte', (req, res) => {

  email = req.session.userid;
  let password = req.body.password;
  db.get("SELECT password  FROM cliente WHERE email=$email", {
    $email: email
  }, (error, row) => {
    if (error) {
      return res.render('creado')
    }
    if (row) {
      console.log(row.password);
      if (bcrypt.compareSync(password, row.password)) {

        db.run(`DELETE FROM cliente WHERE $email=email`, {
            $email: email
          },
          (error, row) => {
            if (!error) {

              res.redirect('/logout');

            }
            if (error) {
              console.log(error);
              res.render('nohayresultados')
            }

          }

        )

      }

    }

  });


});





app.post('/eliproduc', (req, res) => {
  let cod_referencia = req.body.cod_referencia;


  db.run(`DELETE FROM PRODUCTO WHERE $cod_referencia=cod_referencia `, {
      $cod_referencia: cod_referencia
    },

    function (error) {
      if (!error) {


        res.render('eliminadoexito');
      }
      if (error) {
        console.log(error);
        res.render('nosepudoeliminar')
      }
    }


  )
});
app.post('/elicli', (req, res) => {
  let email = req.body.email;


  db.run(`DELETE FROM cliente WHERE $email=email `, {
      $email: email
    },

    function (error) {
      if (!error) {


        res.render('eliminadoexito');
      }
      if (error) {
        console.log(error);
        res.render('nosepudoeliminar')
      }
    }


  )
});


app.post('/aggproducto', (req, res) => {
  let nombre = req.body.nombre;
  let categoria = req.body.categoria;
  let valor = req.body.valor;
  let imagen = req.body.imagen;
  db.run(`INSERT INTO PRODUCTO(cod_referencia,nombre, categoria, valor, imagen) VALUES(?, ?, ?, ?, ?)`,
    [, nombre, categoria, valor, imagen],
    function (error) {
      if (!error) {
        console.log("producto creado");
        return res.redirect('/cata');
      } else {
        console.log("error", error.code);
      }

    }
  )
})

app.get('/logout', (req, res) => {
  session = req.session;
  if (session.userid) {
    req.session.destroy();
    conectado = false
    return res.redirect('/');
  }
  return res.redirect('/login')
})



app.get('/comprar/:idarticulo', (req, res) => {
  session = req.session;

  if (session.userid) {
    let id = req.params.idarticulo;

    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
      return res.render('ingreseid');
    }
cod_referencia=id
    db.get("SELECT cod_referencia,nombre,valor,imagen FROM PRODUCTO WHERE $cod_referencia=cod_referencia  ", {
      $cod_referencia: cod_referencia
    }, (error, row) => {
let zed=row.valor*1.19
if (!error) {
  res.render('factura', {
    data: [{
     
      nombre: row.nombre,
      valor:row.valor,
      total:zed,
      cod_referencia:row.cod_referencia,
      imagen: row.imagen
  
    }]
  });
}
if (error) {
  return console.log("error");
}




    })


  }


else {
    res.render('porfaini')
  };

})





app.post('/comprr/:idarticulo', (req, res) => {

  session = req.session;

  if (session.userid) {
    //recogemos el id del articulo a comprar
    let id = req.params.idarticulo;
    email = session.userid;
    //validamos el parametro
    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
      return res.render('ingreseid');
    }
    //hacemos el proceso de compra en la bd...
    let fecha = new Date();
    arreglo = [, fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear(), ]
    listo = arreglo.join(" ");
    db.run(`INSERT INTO compras(cod_compra,fecha,emailusu,info_produ)   VALUES(?,?,?,?)`,
      [, listo, email, id],

      function (error) {
        if (!error) {
         
          res.render("graciascompra")
             transporter.sendMail({
               from: 'aquaflorfloristeria@gmail.com',
               to: email,
               subject: 'Test Email Subject',
               html: '<img src="https://res.cloudinary.com/dwczm63h6/image/upload/v1656504075/Captura_de_pantalla_2022-06-29_065911_xgl0tg.jpg" alt="">'
             }).then((res) =>{console.log(res);}).catch((err) => {console.log(err);})
        }
        if (error) {
          return console.log("error");
        }


      }


    )
    //enviamos un correo de confirmacion de compra...
    //retornamos un mensaje de compra exitosa


  } else {
    res.render('porfaini')
  };
})











app.post('/pqr', (req, res) => {

  let pqr = req.body.pqr;
  let fecha = new Date();
  arreglo = [, fecha.getDate(), fecha.getMonth() + 1, fecha.getFullYear(), ]
  listo = arreglo.join(" ");

  db.run(`INSERT INTO AYUDA(NRO_PQR,DESCRIPCION_PROBLEMA,FECHA) VALUES(?, ?,?)`,
    [, pqr, listo],
    function (error) {
      if (!error) {
        console.log();
        ("Haremos lo posible por solucionarlo");
      }
    }
  );
  res.render('ajustes')
})

app.post('/editcontra', (req, res) => {

  email = req.session.userid;
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  db.run(`UPDATE cliente SET password=? WHERE email=?`,
    [hash, email],
    (error, row) => {

      if (!error) {
        console.log(hash);
        res.redirect('/logout');
      }

      if (error) {
        console.log(error);
        res.render("nopudieronsepudieroncargar")
      }


    }

  )
});

app.post('/editarprodu', (req, res) => {
  let nombre = req.body.nombre;
  let categoria = req.body.categoria;
  let valor = req.body.valor;
  let imagen = req.body.imagen;
  let cod_referencia = req.body.cod_referencia;
  db.run(`UPDATE PRODUCTO SET nombre=?,categoria=?,valor=?,imagen=? WHERE cod_referencia=?`,
    [nombre, categoria, valor, imagen, cod_referencia],

    function (error) {
      if (!error) {

        res.render('cargadoexito');
      }

      if (error) {
        console.log(error);

      }


    }

  )
});

app.post('/editarme', (req, res) => {
  let nombre = req.body.nombre;
  let numero = req.body.numero;
  email = req.session.userid;
  db.run(`UPDATE cliente SET name=?,number=? WHERE email=?`,
    [nombre, numero, email],

    function (error) {
      if (!error) {

        res.render('cargadoexito');
      }

      if (error) {
        console.log(error);

      }


    }

  )
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})