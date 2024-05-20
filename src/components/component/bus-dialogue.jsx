import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../ui/bus-dialog-ui";
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { Database } from '@sqlitecloud/drivers';
import { DialogPortal } from '../ui/date_location_dialog';
import { DialogOverlay } from '@radix-ui/react-dialog';


function SeatList(rowNo, colNo, seatNo, date, month, year, depart_loc, arr_loc) {
  this.rowNo = rowNo;
  this.colNo = colNo;
  this.seatNo = seatNo;
}

const BusSeatStatusEnum = {
  Available: "Available",
  Selected: "Selected",
  Taken: "Taken",
}

function BusDialogue({ Price_given, Routeno_given, Busno_given, Depart_Loc_given, Arr_Loc_given, Time_Hour_given, Time_AM_PM_given, Date_given, Month_given, Year_given }) {

  let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');
  const { toast } = useToast();

  // create a usestate with list/array of selectedseats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // dialogue open state
  const [open, setOpen] = useState(false);

  // Set the total number of seats
  const totalSeats = 28;

  // Set the total number of columns
  const totalColumns = 4;

  // Set the total number of rows
  const totalRows = Math.ceil(totalSeats / totalColumns);

  var temp = new Array(totalSeats);
  for (let i = 0; i < totalSeats; i++) {
    temp[i] = BusSeatStatusEnum.Available;
  }

  // create a 28 seats array
  const [seats, setSeats] = useState(temp);


  function getSeatRowColumn(seatNo) {
    // Calculate the row number
    const rowNo = seatNo % totalRows === 0 ? totalRows : seatNo % totalRows;

    // Calculate the column number
    const colNo = Math.ceil(seatNo / totalRows);

    return [rowNo, colNo];
  }

  // function to switch the seat status
  const switchSeat = (seatIndex) => {
    // Make a copy of the seats array
    const updatedSeats = [...seats];

    // Get the seat
    const seat = updatedSeats[seatIndex];

    // If the seat is taken, throw a toaster, and return
    if (seat === BusSeatStatusEnum.Taken) {
      toast({
        variant: "destructive",
        title: "Error: Seat Taken",
        description: "The seats in red are already taken and cannot be selected.",
      })
      return;
    }

    // Otherwise, switch the seat status

    // Get the seat number
    const seatNo = seatIndex + 1;

    // If the seat is available, change it to be selected
    if (seat === BusSeatStatusEnum.Available) {
      updatedSeats[seatIndex] = BusSeatStatusEnum.Selected;

      // Get the seat row and column
      const [rowNo, colNo] = getSeatRowColumn(seatNo);

      // Add the seat to the selected seats
      setSelectedSeats([...selectedSeats, new SeatList(rowNo, colNo, seatNo)]);
    }
    // Otherwise, if the seat is selected, change it to be available
    else if (seat === BusSeatStatusEnum.Selected) {
      updatedSeats[seatIndex] = BusSeatStatusEnum.Available;

      // Remove the seat from the selected seats
      setSelectedSeats(selectedSeats.filter(selectedSeat => !(selectedSeat.seatNo === seatNo)));

    }

    // Update the state with the new array
    setSeats(updatedSeats);
  }

  // SeatButton component
  const SeatButton = ({ index }) => {
    const getClassNames = () => {
      let baseClasses = "w-8 h-8 rounded-sm transition-colors";

      // seats[index] represents the status of the seat
      switch (seats[index]) {
        case BusSeatStatusEnum.Available:
          return `${baseClasses} bg-gray-200 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white`;
        case BusSeatStatusEnum.Selected:
          return `${baseClasses} bg-gray-800 dark:bg-gray-200 text-white hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white`;
        case BusSeatStatusEnum.Occupied:
        default:
          return `${baseClasses} bg-red-500 dark:bg-red-300 text-white hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white`;
      }
    };

    // Calculate the button display text

    // Get the seat number
    const seatNo = index + 1;

    // Get the seat display number
    const [rowNo, colNo] = getSeatRowColumn(seatNo);
    const seatDisplay = rowNo;

    return (
      <button onClick={() => switchSeat(index)} className={getClassNames()}>
        {seatDisplay}
      </button>
    );
  };

  const SeatsColumn = ({ colNo }) => {
    const seatButtons = [];
    let start = (colNo - 1) * totalRows;
    for (let i = 0; i < totalRows; i++) {
      seatButtons.push(<SeatButton key={i + start} index={i + start} />);
    }

    return (
      <div className="col-span-1 flex flex-col items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{colNo}</span>
        {seatButtons}
      </div>
    );
  }

  // Seats View
  const SeatsView = () => {
    const seatsColumns = [];
    for (let i = 1; i <= totalColumns; i++) {
      seatsColumns.push(<SeatsColumn key={i} colNo={i} />);
    }

    return (
      <div className="col-span-8">
        <div className="grid grid-cols-4 gap-4">
          {seatsColumns}
        </div>
      </div>
    );
  };

  const SelectedSeatsView = () => {
    return (
      <div className="col-span-4 bg-gray-100 max-w-[40vh] dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Selected Seats</h3>
        <div className="max-h-[36vh] max-w-[50vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }} >
          <div className="space-y-4">
            {selectedSeats.map((selectedSeat) => (
              // Use selectedSeat.seatNo as the key if each seat has a unique id property
              <div key={selectedSeat.seatNo} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-sm" />
                  {/* Display the seat's row and column number */}
                  <span className="text-sm">Seat {selectedSeat.colNo}-{selectedSeat.rowNo}</span>
                </div>
                {/* Display the seat's price */}
                <span className="text-sm text-gray-500 dark:text-gray-400">${Price_given}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  async function fetchSeats(currentSeats = seats) {
    let result = await database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
    console.log(result);

    // loop through the result and set the seats to taken
    const updatedSeats = [...currentSeats]; // Create a copy of the seats array

    let row = result[0];
    for (let j = 1; j <= 28; j++) {

      if (row[`seat_${j}`] === 'A') {

        if (updatedSeats[j - 1] !== BusSeatStatusEnum.Selected) {
          updatedSeats[j - 1] = BusSeatStatusEnum.Available;
        }
      }
      else if (row[`seat_${j}`] === 'NA') {
        updatedSeats[j - 1] = BusSeatStatusEnum.Taken;
      }
      else {
        updatedSeats[j - 1] = BusSeatStatusEnum.Taken;
      };
    }

    // Update the state with the new array
    setSeats(updatedSeats);

    // Return the updated seats instantly, for them to be used in the fetch callback
    return updatedSeats;
  }

  useState(() => {
    fetchSeats();
  }, [Price_given, Routeno_given, Busno_given]);

  const clearSeats = async (showToast = true, clearClicked = false) => {
    // check if any is selected, if not throw a toast, if we can show toast
    if (selectedSeats.length === 0) {

      // If we can show the toast, throw the toast
      if (showToast === true) {
        toast({
          variant: "destructive",
          title: "Error: No Seats Selected",
          description: "Please select a seat to clear.",
        })
      }

      return;
    }
    else if (selectedSeats.length > 0) {
      if (showToast === true && clearClicked === false) {
        // create a copy of selected seats
        let selectedSeatsCopy = [...selectedSeats];
        // get data from database
        let result = await database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
        console.log(result);
        let row = result[0];
        for (let j = 0; j < selectedSeatsCopy.length; j++) {
          if (row[`seat_${selectedSeatsCopy[j].seatNo}`] !== 'A') {
            // remove the seat from selected seats
            selectedSeatsCopy.splice(j, 1);
            j--;

          }
        }
        setSelectedSeats(selectedSeatsCopy);
        return selectedSeatsCopy;
      }
    }

    // loop and if not taken and selected then set to available
    const updatedSeats = [...seats]; // Create a copy of the seats array
    for (let i = 0; i < updatedSeats.length; i++) {
      if (updatedSeats[i] === BusSeatStatusEnum.Selected) {
        updatedSeats[i] = BusSeatStatusEnum.Available;
      }
    }

    // Update the state with the new array
    setSeats(updatedSeats);

    // clear selected seats
    setSelectedSeats([]);

    // Return the updated seats instantly, for them to be used in the fetch callback
    return updatedSeats
  }

  function buttonClicked() {
    let updatedSeats = clearSeats(false); // Do not show toast
    // in updated seats, set the selected seats to available
    fetchSeats(updatedSeats);
  }

  async function confirmSeats() {

    // check if any is selected, if not throw a toast
    if (selectedSeats.length === 0) {
      toast({
        variant: "destructive",
        title: "Error: No Seats Selected",
        description: "Please select a seat to confirm.",
      })
      return;
    }

    let query = `SELECT CASE WHEN seat_${selectedSeats[0].seatNo} = 'A'`;
    for (let i = 1; i < selectedSeats.length; i++) {
      query += ` AND seat_${selectedSeats[i].seatNo} = 'A'`;
    }
    query += ` THEN 1 ELSE 0 END AS is_seat_A FROM Seats_Info WHERE route_no = '${Routeno_given}' AND bus_no = '${Busno_given}' AND Depart_Loc = '${Depart_Loc_given}' AND Arr_Loc = '${Arr_Loc_given}' AND Time_Hour = '${Time_Hour_given}' AND Time_AM_PM = '${Time_AM_PM_given}' AND Date = '${Date_given}' AND Month = '${Month_given}' AND Year = '${Year_given}' LIMIT 1;`;


    let res_num = await database.sql(query);
    console.log("Complete result:", res_num);

    if (res_num.length > 0) {
      let is_seat_A = res_num[0].is_seat_A;
      console.log("test num", is_seat_A);
      if (is_seat_A === 0) {
        clearSeats();
        fetchSeats();
        toast({
          variant: "destructive",
          title: "Error: Seat Taken",
          description: "The seat you selected has already been taken. Sorry for the inconvenience. We will update the seats again.",
        })
      }
      else {
        if (is_seat_A === 1) {

          let new_query = `UPDATE Seats_Info SET `;
          new_query += ` seat_${selectedSeats[0].seatNo} = 'NA'`;
          for (let i = 1; i < selectedSeats.length; i++) {
            new_query += `, seat_${selectedSeats[i].seatNo} = 'NA'`;
          }
          new_query += ` WHERE route_no = '${Routeno_given}' AND bus_no = '${Busno_given}' AND Depart_Loc = '${Depart_Loc_given}' AND Arr_Loc = '${Arr_Loc_given}' AND Time_Hour = '${Time_Hour_given}' AND Time_AM_PM = '${Time_AM_PM_given}' AND Date = '${Date_given}' AND Month = '${Month_given}' AND Year = '${Year_given}' AND (`;
          new_query += `seat_${selectedSeats[0].seatNo} = 'A'`
          for (let i = 1; i < selectedSeats.length; i++) {
            new_query += ` AND seat_${selectedSeats[i].seatNo} = 'A'`;
          }
          new_query += `); `;
          new_query += `SELECT CASE WHEN EXISTS (SELECT 1 FROM Seats_Info WHERE `;
          new_query += `route_no = '${Routeno_given}' AND bus_no = '${Busno_given}' AND Depart_Loc = '${Depart_Loc_given}' AND Arr_Loc = '${Arr_Loc_given}' AND Time_Hour = '${Time_Hour_given}' AND Time_AM_PM = '${Time_AM_PM_given}' AND Date = '${Date_given}' AND Month = '${Month_given}' AND Year = '${Year_given}'`;
          new_query += ` AND seat_${selectedSeats[0].seatNo} = 'NA'`;
          for (let i = 1; i < selectedSeats.length; i++) {
            new_query += ` AND seat_${selectedSeats[i].seatNo} = 'NA'`;
          }
          new_query += `) THEN 1 ELSE 0 END AS is_new_Seat_A;`;
          let result_query = await database.sql(new_query);
          console.log("result query", result_query);
          let new_row = result_query[0];
          let is_new_seat_A = new_row.is_new_Seat_A;
          if (is_new_seat_A === 0) {
            clearSeats();
            fetchSeats();
            toast({
              variant: "destructive",
              title: "Error: Seat Taken",
              description: "The seat you selected has already been taken. Sorry for the inconvenience. We will update the seats again.",
            })
            return;
          }
          else if (is_new_seat_A === 1) {
            // value added in database
            fetchSeats();

            let final_booking_query = `INSERT INTO Bookings (route_no, bus_no, Depart_Loc, Arr_Loc, price, seat_no, Time_Hour, Time_AM_PM, Date, Month, Year, Email) VALUES `;
            final_booking_query += `('${Routeno_given}', '${Busno_given}', '${Depart_Loc_given}', '${Arr_Loc_given}', ${Price_given}, ${selectedSeats[0].seatNo}, '${Time_Hour_given}', '${Time_AM_PM_given}', '${Date_given}', '${Month_given}', '${Year_given}', 'test@email.com')`;
            for (let i = 1; i < selectedSeats.length; i++) {
              final_booking_query += `, ('${Routeno_given}', '${Busno_given}', '${Depart_Loc_given}', '${Arr_Loc_given}', ${Price_given}, ${selectedSeats[i].seatNo}, '${Time_Hour_given}', '${Time_AM_PM_given}', '${Date_given}', '${Month_given}', '${Year_given}', 'test@email.com')`;
            }
            final_booking_query += `;`;

            let final_result = await database.sql(final_booking_query);
            console.log("final result", final_result);
          }
        }
        // throw success toast
        toast({
          variant: "success",
          title: "Success",
          description: "Your seats have been successfully booked.",
        })
        // close the dialogue
        setOpen(false);
        closeDialog_prev();
      }
    }

    return;
  }

  return (

    <Dialog onOpenChange={setOpen} open={open} defaultOpen={open}
    >
      <DialogPortal />
      <DialogOverlay />
      <DialogTrigger asChild>
        <Button onClick={() => buttonClicked()}
          size="icon" variant="outline">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">View route</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Toaster
        ></Toaster>
        <DialogClose>
          <button className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <Card
        >
          <div className='overflow-auto'>
            <div
              className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-auto">
              <div className="p-6 md:p-8 overflow-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Select Your Seats</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Selected</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <SeatsView />
                  <SelectedSeatsView />
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex justify-end gap-4">
                <Button onClick={() => clearSeats(true, true)}
                  variant="outline">Clear</Button>

                <Button onClick={() => confirmSeats()}
                >Continue</Button>
              </div>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog >

  )
}

function ArrowRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>)
  );
}

export default BusDialogue