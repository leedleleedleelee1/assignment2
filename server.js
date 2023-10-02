/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _Frank Fu_____________________ Student ID: __126609197____________ Date: _Oct 1 2023_
*
*  Online (Cyclic) Link: 
*
********************************************************************************/ 
const express = require('express'); 
const dataService = require('./data-service');
const app = express(); 
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080; 

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});


app.get('/vehicles', (req, res) => {
    dataService.getAllVehicles()
        .then((vehicles) => {
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicles);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});


app.get('/vehicles2023', (req, res) => {
    dataService.get2023Vehicles()
        .then((vehicles2023) => {
            res.setHeader('Content-Type', 'application/json');
            res.json(vehicles2023);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});


app.get('/brands', (req, res) => {
    dataService.getBrands()
        .then((brands) => {
            res.setHeader('Content-Type', 'application/json');
            res.json(brands);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});


app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

dataService.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
    })
    .catch((err) => {
        console.error(`Data initialization failed: ${err.message}`);
    });