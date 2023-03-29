import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {FirebaseContext} from '../../firebase'
import Platillo from '../ui/Platillo';

const Menu = () => {

    const [platillos, guardarPlatillos] = useState([]);
    const { firebase } = useContext(FirebaseContext);


    // Consultar la DB al cargar el componente
    useEffect(() => {
      const obtenerPlatillos =  () => {
        firebase.db.collection('productos').onSnapshot(manejarSnapshot);
      }
      obtenerPlatillos();
    }, [])

    // Snapchot nos permite utilizar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot){
        const platillos = snapshot.docs.map( doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        // Almacenar platillos en el state
        guardarPlatillos(platillos);
    }
    

    return ( 
        <>
            <h1 className='text-3xl fon-light mb-4' >Menu</h1>
            <Link className='bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold' to='/nuevoPlatillo'>Agregar platillo</Link>

            {platillos.map ( platillo => 
                (
                    <Platillo
                        key={platillo.id}
                        platillo={platillo}
                    />
                )
            ) }
        </>
     );
}
 
export default Menu;