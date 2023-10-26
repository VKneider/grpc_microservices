import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from "./Components/Database/Database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cors from "cors";
import crudClient from "./GRPC/Client/gRPC_Client.js";

const app = new express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await db.executeQuery('createTable', []);

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

app.use((req,res,next)=>{
    console.log(req.body)
    next();
})

app.get("/products", function (req, res) {
        
    const rows = [];
    const call = crudClient.readAll();
    call.on("data", function (response) {
      rows.push(response);
    });
    call.on("end", function () {
      return res.json(rows);
    });
    call.on("error", function (error) {
      console.log(error);
    });
    
   
});


// Endpoint para obtener un producto por ID
app.get("/products/:id", async function (req, res) {
    if(req.params.id){

        const productId = {
            id: req.params.id,
        };

        crudClient.Read(productId, function (err, response) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Error en el servidor" });
            } else {
                res.json(response);
            }
        });
    }else{
        res.status(400).json({ error: "Id requerido" });
    }
});


app.post("/products", function (req, res) {
    const { descrip } = req.body;

    const newProduct = {
        descrip: descrip,
    };

    crudClient.Create(newProduct, function (err, response) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error en el servidor" });
        } else {
            res.json(response);
        }
    });
});

// Endpoint para actualizar un producto por ID
app.put("/products", function (req, res) {


    const newProduct = {
        id: req.body.id,
        descrip: req.body.descrip,
    };

    crudClient.Update(newProduct, function (err, response) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error en el servidor" });
        } else {
            res.json(response);
        }
    });
});

// Endpoint para eliminar un producto por ID
app.delete("/products", function (req, res) {
    
    const deleteProduct = {
        id: req.body.id
    };

    crudClient.Delete( deleteProduct, function (err, response) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Error en el servidor" });
        } else {
            res.json(response);
        }
    });
});

