import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './FirebaseConfig';

export function useFireLocations() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'locations'), orderBy('name'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setLocations(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            rating: doc.data().rating,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
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