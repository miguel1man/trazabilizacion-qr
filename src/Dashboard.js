import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, addDoc, orderBy  } from "firebase/firestore";
import { QrReader } from 'react-qr-reader';

function Dashboard() {
  const [scannedData, setScannedData] = useState('No result');
  const [shouldStopScanner, setShouldStopScanner] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const readRegisteredCodes = async () => {
    try {
      const scannedCodesRef = collection(db, "scannedCodes");
      const q = query(scannedCodesRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
    
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
  
      // Define las columnas de la tabla en thead
      const columns = ["Registered Code", "Timestamp"];
      const theadRow = document.createElement("tr");
      columns.forEach((column) => {
        const th = document.createElement("th");
        th.textContent = column;
        theadRow.appendChild(th);
      });
      thead.appendChild(theadRow);
      table.appendChild(thead);
  
      // Llena las filas de la tabla con los datos de Firestore en tbody
      snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");
        const registeredCodeCell = document.createElement("td");
        const truncatedCode = data.registeredCode.substring(0, 20) + '...';
        registeredCodeCell.textContent = truncatedCode;
        const timestampCell = document.createElement("td");
        timestampCell.textContent = data.timestamp.toDate().toLocaleString();
        row.appendChild(registeredCodeCell);
        row.appendChild(timestampCell);
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
  
      // Muestra la tabla en el frontend debajo de <p>{scannedData}</p>
      const container = document.querySelector(".dashboard__container");
      container.appendChild(table);
    } catch (err) {
      console.error(err);
      alert("An error occurred while reading registered codes from the database.");
    }
  };
  

  const fetchUserName = useCallback(async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
    
  }, [user, loading, fetchUserName, navigate]);

  const handleScan = async (code) => {
    try {
      const newCodeRef = collection(db, "scannedCodes");
      const codeData = {
        userUid: user?.uid,
        registeredCode: code,
        timestamp: new Date()
      }
      await addDoc(newCodeRef, codeData);
      setShouldStopScanner(true);
    } catch (err) {
      console.error(err);
      alert("An error occurred while adding the scanned code to the database.");
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        {!shouldStopScanner && (
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setScannedData(result?.text);
                handleScan(result?.text);
                readRegisteredCodes();
                console.log({scannedData});
              }
              if (!!error) {
                console.info(error);
              }
            }}
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
