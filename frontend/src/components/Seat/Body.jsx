import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from '../../config';

const Body = ({ data, onSeatsSelected, selectedShowTiming, selectedDate }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTimeSeats, setShowTimeSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  let date = selectedDate.format('YYYY-MM-DD');
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = localStorage.getItem('userId');
        const response = await axios.get(`${BaseURL}user/reservedseats/${id}`, {
          params: {
            movie: data.movies,
            theatre: data.name,
            date,
            time: selectedShowTiming,
          },
        });
       
        const reservedSeats = response.data.reservedSeats.flat() || [];
        
        setReservedSeats(reservedSeats);
      } catch (error) {
        console.log('Error fetching selected seats:', error);
      }
    };

    fetchData();
  }, [data.movies, data.name, date, selectedShowTiming]);

  useEffect(() => {
    const showTimeSeats =
      data.showTimings.find((showTiming) => showTiming.startTime === data.selectedShowTiming)?.seats || [];
    setSelectedSeats(showTimeSeats);
    setShowTimeSeats(showTimeSeats);
  }, [data.showTimings, data.selectedShowTiming]);

  useEffect(() => {
    setSelectedSeats([]);
    setShowTimeSeats([]);
  }, [data]);

  const totalseats = data.seats;

  const rows = 10;
  const columns = Math.ceil(totalseats / rows);

  const handleSeatClick = (seat) => {
    const selectedIndex = selectedSeats.indexOf(seat);
    let updatedSelectedSeats;

    if (selectedIndex !== -1) {
      updatedSelectedSeats = selectedSeats.filter((_, index) => index !== selectedIndex);
    } else {
      updatedSelectedSeats = [...selectedSeats, seat];
    }

    setSelectedSeats(updatedSelectedSeats);
    onSeatsSelected(updatedSelectedSeats);
  };

  const renderSeats = () => {
    const seats = [];
  
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        const seatIndex = (row - 1) * columns + col;
        if (seatIndex > totalseats) {
          break;
        }
  
        const seat = `${String.fromCharCode(64 + row)}${col}`;
        const isSelected = selectedSeats.includes(seat);
        const isReserved = reservedSeats.includes(seat);
  
        seats.push(
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            style={{
              backgroundColor: isSelected ? 'green' : isReserved ? 'red' : 'skyblue',
              color: isSelected ? 'white' : isReserved ? 'white' : 'black',
              padding: '10px',
              margin: '10px',
              cursor: isReserved ? 'not-allowed' : 'pointer',
              display: 'inline-block',
              border: '1px solid black',
              borderRadius: '20px',
              width: '40px',
              height: '40px',
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            <b>{seat}</b>
          </div>
        );
      }
      seats.push(<br key={`br-${row}`} />);
    }
  
    return seats;
  };
  
  return <div>{renderSeats()}</div>;
};

export default Body;
