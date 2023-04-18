import React, {useEffect, useState, useContext} from 'react';
import {FirebaseContext} from '../../firebase';
import Orden from '../ui/Orden';


const Ordenes = () => {

    //State para guardar ordenes
    const [ordenes, guardarOrdenes] = useState([]);

    //Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // Consultar la DB al cargar el componente
    useEffect(() => {
        const obtenerOrdenes =  () => {
          firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot);
        }
        obtenerOrdenes();
      }, []);

    // Snapchot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot){
        const ordenes = snapshot.docs.map( doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        // Almacenar platillos en el state
        guardarOrdenes(ordenes);
    }

    return ( 
        <>
            <h1 className=" text-3xl fon-light mb-4 ">Ordenes</h1>

            <div className='sm:flex sm:flex-wrap -mx-3'>
                {ordenes.map ( orden => 
                    (
                        <Orden
                            key={orden.id}
                            orden={orden}
                        />
                    )
                ) }
            </div>

        </>
     );
}
 
export default Ordenes;