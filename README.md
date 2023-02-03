# Entrega-Coder

Deploy:

https://entrega-coder-production.up.railway.app/



Rutas:

api/info

api/randoms

api/user/signup


Body: 

{
    "username" : "pepeargento",
    "password" : "1234",
    "nombre" : "Pepe",
    "apellido" : "Argento",
    "email" : "julioignaciootero@gmail.com",
    "direccion" : "Flores",
    "edad" : 50,
    "telefono" : "123123",
    "avatar" : "https://static.wikia.nocookie.net/casados-con-hijos-ar/images/3/39/X-epbo6W.jpg/revision/latest/scale-to-width-down/250?cb=20160124204139&path-prefix=es"
}


api/user/login


api/productos

Body:

{

    "nombre": "Cartuchera",
    "descripcion" : "Cartuchera cuero",
    "codigo" : "0987654321",
    "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-48.png",
    "precio" : 1000,
    "stock" : 200

}

api/carritos 

Body:

{

    "productos" : [
        {
            "producto" : "63da9d824f9431caebcab7d5",
            "cantidad" : 7
        }
    ]
}

api/user/finalizarcompra

{

    "username" : "pepeargento",
    "id_carrito" : "63db053bb4d1d764eff12826"

}



api/user/asignarcarrito

{

    "username" : "pepeargento",
    "id_carrito" : "63db053bb4d1d764eff12826"

}



Correo creacion:



Correo Compra finalizada:


