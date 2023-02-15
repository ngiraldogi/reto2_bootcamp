/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/registro-animales', 'AnimalsController.setRegistrarAnimal');

  Route.put('/modificar-animales/:id', 'AnimalsController.setModificarAnimal');

  Route.delete('/eliminar-animales/:id', 'AnimalsController.setEliminarAnimal');

  Route.get('/lista-animales', 'AnimalsController.getListarAnimales');
  Route.get('/filtrar-animales', 'AnimalsController.filtrarAnimalesPorEspecie');
  Route.get('/filtrar-animales-edad', 'AnimalsController.filtrarAnimalesPorEdad');
}).prefix('/tienda');

