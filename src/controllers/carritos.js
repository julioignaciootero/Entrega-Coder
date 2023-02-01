import { carritoModel } from "../models/carritos.js";
import { prodcutModel } from "../models/productos.js";
import mongoose, { ObjectId }  from 'mongoose'
// import { ObjectId } from "mongodb";

export const checkBodyCarrito = async ( req  ,  res , next) => {
    
    const { productos } = req.body
    console.log(productos)
    if (!productos) {

        return res.status(400).json({
            ok: false,
            msg: "Por favor complete todos los datos"
        })
        
    }
    next();
}

export const deleteProducto = async ( req , res) => {

    const id  = req.params.id;
    const id_prod = req.params.id_prod
    const id_prod_object = new mongoose.mongo.ObjectId(id_prod)
    // console.log(id_prod + "         " + id_prod_object)
    // return
    try {
        
        const encontrado = await carritoModel.findById(id)

        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
    
            })
 
        } else {
            
            encontrado.productos.forEach(element => {
                // console.log(element.producto + "       " + id_prod_object)
                console.log(JSON.stringify(element.producto) === JSON.stringify(id_prod_object)) 
            });
            
            const prod = encontrado.productos.find(p => (JSON.stringify(p.producto) === JSON.stringify(id_prod_object)))

            if (prod) {
                await carritoModel.findByIdAndUpdate(id,
                    {
                        $pullAll: {
                            productos : [{ producto : id_prod_object}]
                        }
                    })

                    //Si se elimino el producto le vuelvo a generar el stock al producto                  
                    const stockUpd = await updateStock(prod.producto , prod.cantidad , true)
                
                    return res.status(200).json({
                        ok: false,
                        msg: "Producto eliminado",
            
                    })

            } else {
                return res.status(400).json({
                    ok: false,
                    msg: "Producto No encontrado",
        
                })
            }




        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }    
    

}

export const createCarrito = async(req, res) => {
    console.log("holis");
    
    try {
    
        const { productos } = req.body
        console.log(req.body);
        
        const carritoNuevo = await carritoModel.create({
            productos: productos
        })

        return res.status(200).json({
            ok: true,
            msg: "Carrito creado",
            producto: carritoNuevo

        })

    } catch (error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const deleteCarrito = async (req, res) => {
    
    const { id } = req.params;
    console.log(id)
    try {
    
        const encontrado = await carritoModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
    
            })
 
        } else {

            encontrado.productos.forEach(prod => {
                
                const stockUpd = updateStock(prod.producto, prod.cantidad, true)

            });

            await carritoModel.findByIdAndDelete(id)
            return res.status(200).json({
                ok: true,
                msg: "Carrito eliminado"
    
            })

        }


    } catch (error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}

export const updateStock = async ( id , cantidad , sumar  ) => {
    
    try {
        console.log(id, cantidad, sumar)
        const prod = await prodcutModel.findById(id)
        if (!prod) {
            
            return false
    
        } else {
    
            if (sumar) { prod.stock = prod.stock + cantidad
            } else {     prod.stock = prod.stock - cantidad          
            }
    
            await prodcutModel.findByIdAndUpdate(prod.id , prod)
            return true
    
        }

    } catch (error) {
        console.log(error)
        return false
    }



    

}

export const agregarProducto = async(req, res) => {

    const id  = req.params.id;
    if (!req.body.producto || !req.body.cantidad) 
        res.status(400).json({
          ok: false,
          msg: "Error. Datos incompletos"
        })

    try {
    
        const encontrado = await carritoModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Carrito No encontrado",
    
            })
 
        } else {

            const id_prod = req.body.producto
            const cantidad = req.body.cantidad
            console.log(id_prod);
            
            const prod = await prodcutModel.findById(id_prod)
            if (!prod) {
                
                return res.status(400).json({
                    ok: false,
                    msg: "Producto No encontrado",
        
                })

            } else {
                
                if (cantidad > prod.stock) {
                    return res.status(400).json({
                        ok: false,
                        msg: "Stock no disponible"
                    })
                } 
                const carrito = await carritoModel.findByIdAndUpdate(id,
                    {
                        $addToSet: 
                        {
                            productos: {
                                producto: id_prod,
                                cantidad: cantidad
                            }
                        }
                    }, { new: true })
                
                    prod.stock = prod.stock - cantidad
                    await prodcutModel.findByIdAndUpdate(id_prod, prod)
                    return res.status(200).json({
                        ok: true,
                        msg: "Producto Agregado",
                        carrito : carrito
            
                    })
            }

        }


    } catch (error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }  

}

// export const modificarProducto = async ( req : Request ,  res : Response ) => {

//     const { id } = req.params;
//     try {
        
//         const encontrado = await prodcutModel.findById(id)
//         console.log(encontrado)
//         if (!encontrado) {
            
//             return res.status(400).json({
//                 ok: false,
//                 msg: "Id No encontrado",
    
//             })
 
//         } else {

//             const { nombre , descripcion, codigo, foto, precio, stock } = req.body
//             const modificado = await prodcutModel.findByIdAndUpdate(
//                 id,
//                 { nombre, descripcion, codigo, foto, precio, stock},
//                 {new : true}
//             )
//             return res.status(200).json({
//                 ok: true,
//                 msg: "Producto modificado"
    
//             })

//         }


        

//     } catch (error : any) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: error.message,
//         })
//     }

// }

export const getCarrito = async (req, res) => {

    const { id } = req.params;
    try {
        
        const encontrado = await carritoModel.findById(id)
        console.log(encontrado)
        if (!encontrado) {
            
            return res.status(400).json({
                ok: false,
                msg: "Carrito no encontrado",
    
            })
 
        } else {

            
            return res.status(200).json({
                ok: true,
                msg: "Carrito ecnontrado",
                producto : encontrado
    
            })

        }


        

    } catch (error ) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}



export const getAllCarritos = async (req, res) => {

    try {

        const carritos = await carritoModel.find()
        if (!carritos) {
            return res.status(400).json({
                ok: false,
                msg: "No se encontraron carritos",
    
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: "carritos ecnontrados",
                carritos : carritos
    
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: error.message,
        })
    }

}