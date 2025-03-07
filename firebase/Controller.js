import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./FirebaseConfig";

export function useFireLocations() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'locationapplikation'), orderBy('location'));

        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                setLocations(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            },
            (error) => {
                console.log('Error', error.message);
            }
        );

        return () => unsubscribe();
    }, []);

    return locations;
}