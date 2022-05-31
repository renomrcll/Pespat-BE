const firebase = require('../database/db');
const firestore = firebase.firestore();
const {placesCollectionRef} = require('../database/firebase-collection');

const createPlace = async (req, res) => {
    
    const name = req.body.name;
    const address = req.body.address;
    const details = req.body.details;
    const contact = req.body.contact;
    const price = req.body.price;
    const photo = req.body.photo;
    const quota = req.body.quota;


    try {
        const place = await placesCollectionRef.add({ name, address, details, contact, price, photo,quota });
        res.status(200).json({ message: 'Place created successfully', place_id: place.id });
    } catch(error) {
        res.status(409).json({ error: error.message });
    }
}

const updatePlace = async (req, res) => {

    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const details = req.body.details;
    const contact = req.body.contact;
    const price = req.body.price;
    const photo = req.body.photo;
    const quota = req.body.quota;
    // create json object
    // const place = {
    //     "name":"perpustakaan",
    //     "address":"Jl. Kebon Jeruk",
    //     "details":"Perpustakaan ini berada di kawasan kota",
    //     "contact":"0812341234",
    //     "price":"Rp. 100.000",
    //     "photo":"https://firebasestorage.googleapis.com/v0/b/travel-app-f9f0d.appspot.com/o/places%2Fperpustakaan.jpg?alt=media&token=f9f8f8c0-f8c0-4f0e-b8e0-f8c0f8c0f8c0"
    // }
    
    try {
        if (!id) {
            throw new Error('Cant edit place without id');
        }
        
        const docRef = placesCollectionRef.doc(id);

        let originalData = await docRef.get();

        if (!originalData) {
            throw new Error('No existing plan to delete');
        } else {
            originalData = originalData.data();
            name = name ? name : originalData.name;
            address = address ? address : originalData.address;
            details = details ? details : originalData.details;
            contact = contact ? contact : originalData.contact;
            price = price ? price : originalData.price;
            photo = photo ? photo : originalData.photo;
            quota = quota ? quota : originalData.quota;
        }

        const place = await docRef.update({ name, address, details, contact, price, photo,quota });
        res.status(200).json({ message: 'Place updated successfully', place_id: place.id });
    } catch(error) {
        res.status(409).json({ error: error.message });
    }
}


const deletePlace = async (req, res) => {
    try {
        if(!req.params.id) {
            throw new Error('Cant delete place without id');
        }
        const docRef = placesCollectionRef.doc(req.params.id);
        await docRef.delete();
        res.status(200).json({ message: 'Place deleted successfully'});
    } catch(error) {
        res.status(409).json({ error: error.message });
    }

}


const getPlaces = async (req, res) => {
    try {
        const places = await placesCollectionRef.get();
        const placesArray = places.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        res.status(200).json(placesArray);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPlaceById = async (req, res) => {
    try {
        const id = req.params.id;
        const docRef = placesCollectionRef.doc(id);
        const place = await docRef.get();
        res.status(200).json(place.data());
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createPlace,
    updatePlace,
    deletePlace,
    getPlaces,
    getPlaceById
}