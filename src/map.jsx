import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.jsx";
import MapView from "./mapView.jsx";
import { useState, useEffect } from "react";


function Mapp(){
const fetchReports = async () => {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const [reports, setReports] = useState([]);

useEffect(() => {
  fetchReports().then(setReports);
}, []);
return (
 <div className='h-full w-full'>
   
<MapView reports={reports} />
</div>
)


}

export default Mapp;

