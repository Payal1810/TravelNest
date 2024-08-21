import React, { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const initialState = {

    cityOptions: [],  //to hold the city options
    areaOptions: [], //to hold area option
    city:'',
    area:'',

};


function reducer(state, action) {
    switch (action.type) {
        case 'updateCities':
            return {
                ...state,
                cityOptions: action.val
            };
      case 'update':
        return {
            ...state,
                [action.fld]: action.val
            
        };
      case 'updateAreas':
        return {
          ...state,
          areaOptions: action.val
        };
              
      case 'reset':
        return initialState;
      default:
        return state;
    }
  }

const dispatchCityOptions = (dispatch, cityOptions) => {
    dispatch({ type: 'updateCities', val: cityOptions });
};



export default function SearchHotel(){

    const [hotel, dispatch]= useReducer(reducer, initialState);
    const [msg, setmsg] = useState("");
    const navigate = useNavigate();


    const columnsConfig = [
        { key: 'hid', label: 'Hotel ID' },
        { key: 'hname', label: 'Hotel Name' },
        { key: 'contact', label: 'Contact' },
        { key: 'licenseno', label: 'License No.' },
        { key: 'address', label: 'Address' },
        { key: 'area.aname', label: 'Area Name' },
    ];

    const submitHandle=(e)=>{
        e.preventDefault();
        console.log("Submitting form with data:", hotel);

          fetch("http://localhost:8080/getAllHotelsByArea?area="+hotel.area)
            .then(resp => resp.json())
            .then(obj => setmsg(obj))
            .catch(error => {
                console.error('Error:', error);
                setmsg(error.message);
            });

    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Handling change for ${name} with value ${value}`);
        dispatch({ type: 'update', fld: name, val: value });
      };

    useEffect(()=>{
        fetch("https://localhost:7090/api/UserManagement/GetCity")
            .then(response => response.json())
            .then(data => {
                // Ensure data is in the format [{ CityId: number, Cname: string }]
               // console.log("Raw data from API:", data);
                const cityOptions = data.map(city => ({
                    id: city.cityId,
                    name: city.cname
                }));
               // console.log("Processed city options:", cityOptions);

                dispatchCityOptions(dispatch, cityOptions);
            })
            .catch(error => console.error('Error fetching cities:', error));
    },[])


    useEffect(() => {
        if (hotel.city) {
            const selectedCity = hotel.cityOptions.find(city => city.name === hotel.city);
            if (selectedCity) {
                fetch(`https://localhost:7090/api/UserManagement/GetAreasByCity/${selectedCity.id}`)
                    .then(response => response.json())
                    .then(data => {
                        const areaOptions = data.map(area => ({ id: area.areaId, name: area.aname }));
                        dispatch({ type: 'updateAreas', val: areaOptions });
                    })                   
                    .catch(error => console.error('Error fetching areas:', error));
            }
        }
    }, [hotel.city, hotel.cityOptions]);


    const rows = Array.isArray(msg) ? msg : [msg];
    const renderHeader = () => (
        <thead>
            <tr>
                {columnsConfig.map((col, index) => (
                    <th key={index}>{col.label}</th>
                ))}
                <th>Actions </th>
            </tr>
        </thead>
    );
const renderRows = () => (
        <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columnsConfig.map((col, colIndex) => {
                        // Access nested properties
                        const value = col.key.split('.').reduce((acc, part) => acc && acc[part], row);

                        // Handle cases where value is an object
                        let displayValue = value;
                        if (typeof value === 'object' && value !== null) {
                            displayValue = JSON.stringify(value); // Convert object to string
                        }

                        return (
                            <td key={colIndex}>
                                {displayValue !== undefined && displayValue !== null ? displayValue : 'N/A'}
                            </td>
                        );
                    })}

<td>
                        {/* Add "Next" button */}
                        <Button
                            variant="primary"
                            onClick={() => navigate(`/customer_home/viewRooms/${row.hid}`)} // Navigate to the new component
                        >
                            Next
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );


    return(

        
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="bg-light p-4 mt-5 rounded shadow-lg border" style={{maxWidth: '500px', width:'100%'}}>
            <h1 className="text-center text-primary mb-3">Search Hotel</h1>
            <form onSubmit={submitHandle} className="p-3">
                  <table>
            
                    
                    <tr>
                    <td style={{ paddingRight: '3px' }}>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City:</label>
                                <select className="form-control" id="city" name="city" value={hotel.city} onChange={handleChange}>
                                <option value="" disabled>Select an option</option>
                                 {hotel.cityOptions.map(option => (
                                 <option key={option.id} value={option.name}>{option.name}</option>
                                  ))}
                                 </select>
                                 
                             </div>
                    </td>
                    </tr>
                    <tr>
                    <td style={{ paddingRight: '5px' }}>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label">Area:</label>
                        <select className="form-control" id="area" name="area" value={hotel.area}
                        onChange={handleChange} disabled={!hotel.city}>
                        <option value="" disabled>Select an option</option>
                        {hotel.areaOptions.map(area => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                         ))}
                        </select>
                    
                        </div>
                    </td>
                    </tr>
                    
                    
             </table>
             <Button type="submit" className="btn btn-primary mb-3" >Find Hotels</Button>
             <Button type="button" className="btn btn-secondary mb-3" onClick={() => dispatch({ type: 'reset' })}>Clear</Button>

             </form>
            
            {msg && <table>
             {renderHeader()}
             {renderRows()}
         </table>}
            </div>
          </div> 



    );
};