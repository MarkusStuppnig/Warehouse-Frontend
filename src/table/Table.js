import { useState, useEffect } from "react";
import axios from 'axios';


function Table(props) {

  //http://localhost:8080/warehouse/001/data

  const [data, setData] = useState(null);

  const [warehouseID, setWarehouseID] = useState(null);
  const [warehouseName, setWarehouseName] = useState(null);
  const [warehouseAddress, setWarehouseAddress] = useState(null);
  const [warehousePostalCode, setWarehousePostalCode] = useState(null);
  const [warehouseCity, setWarehouseCity] = useState(null);
  const [warehouseCountry, setWarehouseCountry] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    reload();
  }, []);

  async function reload() {
    const apiUrl = 'http://localhost:8080/warehouse/001/data';
    axios.get(apiUrl)
      .then(function (response) {
        const warehouseData = response.data;
        setData(warehouseData.productData);
        setWarehouseID(warehouseData.warehouseID);
        setWarehouseName(warehouseData.warehouseName);
        setWarehouseAddress(warehouseData.street);
        setWarehousePostalCode(warehouseData.plz);
        setWarehouseCity(warehouseData.city);
        setWarehouseCountry(warehouseData.country);
        setTimestamp(warehouseData.timestamp);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }
  

  return (
    <div className="consumer">
      <button onClick={reload}>Reload</button>
      <br />
      <span>Warehouse ID: {warehouseID}</span>
      <br />
      <span>Warehouse Name: {warehouseName}</span>
      <br />
      <span>Warehouse Address: {warehouseAddress}</span>
      <br />
      <span>Warehouse Postal Code: {warehousePostalCode}</span>
      <br />
      <span>Warehouse City: {warehouseCity}</span>
      <br />
      <span>Warehouse Country: {warehouseCountry}</span>
      <br />
      <span>Timestamp: {timestamp}</span>
      <br />
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Table;