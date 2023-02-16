import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal'

export default class AnimalsController {

    public async getListarAnimales(): Promise<Animal[]>{
        const animales = await Animal.all();
        return animales;
    }

    //Consulta filtrada por especies
    public async filtrarAnimalesPorEspecie({request}: HttpContextContract){
        const {search} = request.all();
        const animales = await Animal.query().where('especie', 'like', `%${search}%`);
        return animales;
    }

    //consulta filtrada por animales menores a 8 años
    public async filtrarAnimalesPorEdad({}: HttpContextContract){
        const animales = await Animal.query().where('edad', '<', 8);
        return animales;
    }

    //Modificar los datos de un animal
    public async setModificarAnimal({ request }: HttpContextContract){
        const id = request.param('id');
        const animal = await Animal.findOrFail(id);
        const datos = request.all();

        animal.nombre_animal = datos.nombre;
        animal.especie = datos.especie;
        animal.raza = datos.raza;
        animal.genero = datos.genero;
        animal.edad = datos.edad;
        await animal.save();
        return {message: 'Animal modificado correctamente', "estado": 200};
    } 

    //Eliminar un registro de un animal
    public async setEliminarAnimal({ request }: HttpContextContract){
        const id = request.param('id');
        await Animal.query().where('codigo_animal', id).delete();
        return {message: 'Animal eliminado correctamente', "estado": 200};
    }
    
    public async setRegistrarAnimal({request, response}: HttpContextContract){
        try {
            const dataAnimal = request.only(['codigo_animal','nombre_animal', 'especie', 'raza', 'genero', 'edad'])
            const codigoAnimal = dataAnimal.codigo_animal;
            const animalExistente: Number = await this.getValidarAnimalExistente(codigoAnimal);
            if(animalExistente == 0){
                await Animal.create(dataAnimal);
                response.status(200).json({message: 'Animal registrado correctamente'});
            }
            else{
                response.status(400).json({message: 'Error, el animal ya se encuentra registrado'});
            }
        }
        catch (error) {
            response.status(500).json({message: 'Error en el servidor'});
        }
    }

    private async getValidarAnimalExistente(codigo_animal: Number): Promise<Number>{
        const total = await Animal.query().where({'codigo_animal': codigo_animal}).count('* as total').from('animals');
        //console.log(parseInt(total[0].$extras['count(total)']));
        return parseInt(total[0].$extras['total'])
    }
}
