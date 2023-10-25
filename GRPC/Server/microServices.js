import db from '../../Components/Database/Database.js';
export default class microServices{

    constructor(){}

    static async Create(call, callback){
        const {descrip} = call.request;
       
        console.log(call.request)
        try {
            const query = await db.executeQuery('create', [descrip]);
            callback(null, {message: 'Created'});

        } catch (error) {
            callback(error, null);
        }

    }
    
    static async Read(call, callback){
        try {
                console.log(`llega ${call.request.id}`)
                const result = await db.executeQuery(`readOne`, [call.request.id]);
                console.log(`result ${JSON.stringify(result)}`)
                callback(null, {id: call.request.id, descrip: result[0].descrip});

        } catch (error) {
            callback(error, null);
        }
    }

    static async ReadAll(call, callback){
        try {
            const query = await db.executeQuery('read', []);
            query.forEach(element => {
                call.write(element)
            })
            call.end();

        } catch (error) {
            callback(error, null);
        }
    }
    
    static async Update(call, callback){

        const {descrip, id} = call.request;

        try {
            const query = await db.executeQuery('update', [descrip, id]);
            callback(null, {});

        } catch (error) {
            callback(error, null);
        }

    }

    static async Delete(call, callback){

        const {id} = call.request;

        try {
            const query = await db.executeQuery('delete', [id]);
            callback(null, {message: 'Deleted'});

        } catch (error) {
            callback(error, null);
        }
    }

}