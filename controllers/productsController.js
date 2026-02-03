const path = require('path');

const fs = require('fs');

const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

const passport = require('passport');
const Products = require('../models/Products');

module.exports.addproducts = async (req, res) => {
    try{
        let productsData = await Products.findById(req.user._id);
        return res.render('add-products', {
            productsData,
            productsRecord : productsData
        })
    }
    catch(err){
        console.log(err); 
        return res.redirect('/');       
    }
}

module.exports.insertproducts = async (req, res) => {
    try {
        let data = req.body;

        if (req.file) {
            data.productimg = Products.adPath + "/" + req.file.filename;
        } else {
            req.flash('error', 'Product image is required');
            return res.redirect('back');
        }

        await Products.create(data);

        req.flash('success', 'Product added successfully');
        return res.redirect('/products/add-products');

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};


module.exports.viewproducts = async (req, res) => {
    try{
        let productsData = await Products.find({});
        console.log(productsData);
        return res.render('view-products', {
            productsData : productsData
        })
    }
    catch(err){
        console.log(err);
        res.render('view-products', { productsData: [] });  
    }

}