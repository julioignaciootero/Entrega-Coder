// import express, { Request, Response, NextFunction } from "express";
import express from 'express'
import {
  checkBodyProducto,
  createProdcuto,
  deleteProdcuto,
  modificarProducto,
  getProducto,
  getAllProductos
} from '../controllers/productos.js'
const router = express.Router()





router.post('/', checkBodyProducto, createProdcuto);
router.delete('/:id', deleteProdcuto);
router.put('/:id', checkBodyProducto, modificarProducto);
router.get('/:id', getProducto);
router.get('/', getAllProductos);


export default router 