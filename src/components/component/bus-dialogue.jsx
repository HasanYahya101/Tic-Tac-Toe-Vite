import React from 'react';
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

let Price_given_; let Routeno_; let Busno_given_; let Depart_Loc_given_; let Arr_Loc_given_; let Time_Hour_given_; let Time_AM_PM_given_; let Date_given_; let Month_given_; let Year_given_;

function SeatList(rowNo, seatNo, seat, date, month, year, depart_loc, arr_loc) {
  this.rowNo = rowNo;
  this.seatNo = seatNo;
  this.seat = seat;
  this.date = date;
  this.month = month;
  this.year = year;
  this.depart_loc = depart_loc;
  this.arr_loc = arr_loc;
}

function BusDialogue({ Price_given, Routeno_given, Busno_given, Depart_Loc_given, Arr_Loc_given, Time_Hour_given, Time_AM_PM_given, Date_given, Month_given, Year_given }) {
  const BusSeatStatusEnum = {
    Available: "Available",
    Selected: "Selected",
    Taken: "Taken",
  }

  // filling global variables
  Price_given_ = Price_given;
  Routeno_ = Routeno_given;
  Busno_given_ = Busno_given;
  Depart_Loc_given_ = Depart_Loc_given;
  Arr_Loc_given_ = Arr_Loc_given;
  Time_Hour_given_ = Time_Hour_given;
  Time_AM_PM_given_ = Time_AM_PM_given;
  Date_given_ = Date_given;
  Month_given_ = Month_given;
  Year_given_ = Year_given;

  let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');
  const { toast } = useToast();

  // create a usestate with list/array of selectedseats
  const [selectedSeats, setSelectedSeats] = useState([]);


  // create a 28 seats array
  const [seats, setSeats] = useState(new Array(28));

  // write a function called switch seat that takes in a number
  const switchSeat = (seatNumber, row, col) => {
    // if seat is taken throw toaster
    if (seats[seatNumber] === BusSeatStatusEnum.Taken) {
      toast({
        title: "Error: Seat Taken",
        description: "The seats in red are already taken and cannot be selected.",
        type: "error"
      })
      return;
    }
    else {
      const updatedSeats = [...seats]; // Create a copy of the seats array
      if (updatedSeats[seatNumber] === BusSeatStatusEnum.Available) {
        updatedSeats[seatNumber] = BusSeatStatusEnum.Selected;
        // add to selected seats
        setSelectedSeats([...selectedSeats, new SeatList(row, col, seatNumber + 1)]);
      } else if (updatedSeats[seatNumber] === BusSeatStatusEnum.Selected) {
        updatedSeats[seatNumber] = BusSeatStatusEnum.Available;
        // remove from selected seats
        setSelectedSeats(selectedSeats.filter(seat => !(seat.rowNo === row && seat.seatNo === col)));
      }

      // Update the state with the new array
      setSeats(updatedSeats);
    }
  }

  async function fetchSeatsandsetTaken() {
    // only set the seats that are taken without distirbing the selected ones. One change the selected ones if they are taken.
    let result = await database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
    console.log(result);

    const updatedSeats = [...seats]; // Create a copy of the seats array
    for (let i = 0; i < result.length; i++) {
      if (result[i].seat_1 !== 'A')
        updatedSeats[0] = BusSeatStatusEnum.Taken;

      if (result[i].seat_2 !== 'A')
        updatedSeats[1] = BusSeatStatusEnum.Taken;

      if (result[i].seat_3 !== 'A')
        updatedSeats[2] = BusSeatStatusEnum.Taken;

      if (result[i].seat_4 !== 'A')
        updatedSeats[3] = BusSeatStatusEnum.Taken;

      if (result[i].seat_5 !== 'A')
        updatedSeats[4] = BusSeatStatusEnum.Taken;

      if (result[i].seat_6 !== 'A')
        updatedSeats[5] = BusSeatStatusEnum.Taken;

      if (result[i].seat_7 !== 'A')
        updatedSeats[6] = BusSeatStatusEnum.Taken;

      if (result[i].seat_8 !== 'A')
        updatedSeats[7] = BusSeatStatusEnum.Taken;

      if (result[i].seat_9 !== 'A')
        updatedSeats[8] = BusSeatStatusEnum.Taken;

      if (result[i].seat_10 !== 'A')
        updatedSeats[9] = BusSeatStatusEnum.Taken;

      if (result[i].seat_11 !== 'A')
        updatedSeats[10] = BusSeatStatusEnum.Taken;

      if (result[i].seat_12 !== 'A')
        updatedSeats[11] = BusSeatStatusEnum.Taken;

      if (result[i].seat_13 !== 'A')
        updatedSeats[12] = BusSeatStatusEnum.Taken;

      if (result[i].seat_14 !== 'A')
        updatedSeats[13] = BusSeatStatusEnum.Taken;

      if (result[i].seat_15 !== 'A')
        updatedSeats[14] = BusSeatStatusEnum.Taken;

      if (result[i].seat_16 !== 'A')
        updatedSeats[15] = BusSeatStatusEnum.Taken;

      if (result[i].seat_17 !== 'A')
        updatedSeats[16] = BusSeatStatusEnum.Taken;

      if (result[i].seat_18 !== 'A')
        updatedSeats[17] = BusSeatStatusEnum.Taken;

      if (result[i].seat_19 !== 'A')
        updatedSeats[18] = BusSeatStatusEnum.Taken;

      if (result[i].seat_20 !== 'A')
        updatedSeats[19] = BusSeatStatusEnum.Taken;

      if (result[i].seat_21 !== 'A')
        updatedSeats[20] = BusSeatStatusEnum.Taken;

      if (result[i].seat_22 !== 'A')
        updatedSeats[21] = BusSeatStatusEnum.Taken;

      if (result[i].seat_23 !== 'A')
        updatedSeats[22] = BusSeatStatusEnum.Taken;

      if (result[i].seat_24 !== 'A')
        updatedSeats[23] = BusSeatStatusEnum.Taken;

      if (result[i].seat_25 !== 'A')
        updatedSeats[24] = BusSeatStatusEnum.Taken;

      if (result[i].seat_26 !== 'A')
        updatedSeats[25] = BusSeatStatusEnum.Taken;

      if (result[i].seat_27 !== 'A')
        updatedSeats[26] = BusSeatStatusEnum.Taken;

      if (result[i].seat_28 !== 'A')
        updatedSeats[27] = BusSeatStatusEnum.Taken;

    }
    // Update the state with the new array
    setSeats(updatedSeats);
  }

  async function fetchSeats() {
    let result = await database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
    console.log(result);
    // loop through the result and set the seats to taken
    const updatedSeats = [...seats]; // Create a copy of the seats array

    for (let i = 0; i < result.length; i++) {
      if (result[i].seat_1 === 'A')
        updatedSeats[0] = BusSeatStatusEnum.Available;
      else (updatedSeats[0] = BusSeatStatusEnum.Taken);

      if (result[i].seat_2 === 'A')
        updatedSeats[1] = BusSeatStatusEnum.Available;
      else (updatedSeats[1] = BusSeatStatusEnum.Taken);

      if (result[i].seat_3 === 'A')
        updatedSeats[2] = BusSeatStatusEnum.Available;
      else (updatedSeats[2] = BusSeatStatusEnum.Taken);

      if (result[i].seat_4 === 'A')
        updatedSeats[3] = BusSeatStatusEnum.Available;
      else (updatedSeats[3] = BusSeatStatusEnum.Taken);

      if (result[i].seat_5 === 'A')
        updatedSeats[4] = BusSeatStatusEnum.Available;
      else (updatedSeats[4] = BusSeatStatusEnum.Taken);

      if (result[i].seat_6 === 'A')
        updatedSeats[5] = BusSeatStatusEnum.Available;
      else (updatedSeats[5] = BusSeatStatusEnum.Taken);

      if (result[i].seat_7 === 'A')
        updatedSeats[6] = BusSeatStatusEnum.Available;
      else (updatedSeats[6] = BusSeatStatusEnum.Taken);

      if (result[i].seat_8 === 'A')
        updatedSeats[7] = BusSeatStatusEnum.Available;
      else (updatedSeats[7] = BusSeatStatusEnum.Taken);

      if (result[i].seat_9 === 'A')
        updatedSeats[8] = BusSeatStatusEnum.Available;
      else (updatedSeats[8] = BusSeatStatusEnum.Taken);

      if (result[i].seat_10 === 'A')
        updatedSeats[9] = BusSeatStatusEnum.Available;
      else (updatedSeats[9] = BusSeatStatusEnum.Taken);

      if (result[i].seat_11 === 'A')
        updatedSeats[10] = BusSeatStatusEnum.Available;
      else (updatedSeats[10] = BusSeatStatusEnum.Taken);

      if (result[i].seat_12 === 'A')
        updatedSeats[11] = BusSeatStatusEnum.Available;
      else (updatedSeats[11] = BusSeatStatusEnum.Taken);

      if (result[i].seat_13 === 'A')
        updatedSeats[12] = BusSeatStatusEnum.Available;
      else (updatedSeats[12] = BusSeatStatusEnum.Taken);

      if (result[i].seat_14 === 'A')
        updatedSeats[13] = BusSeatStatusEnum.Available;
      else (updatedSeats[13] = BusSeatStatusEnum.Taken);

      if (result[i].seat_15 === 'A')
        updatedSeats[14] = BusSeatStatusEnum.Available;
      else (updatedSeats[14] = BusSeatStatusEnum.Taken);

      if (result[i].seat_16 === 'A')
        updatedSeats[15] = BusSeatStatusEnum.Available;
      else (updatedSeats[15] = BusSeatStatusEnum.Taken);

      if (result[i].seat_17 === 'A')
        updatedSeats[16] = BusSeatStatusEnum.Available;
      else (updatedSeats[16] = BusSeatStatusEnum.Taken);

      if (result[i].seat_18 === 'A')
        updatedSeats[17] = BusSeatStatusEnum.Available;
      else (updatedSeats[17] = BusSeatStatusEnum.Taken);

      if (result[i].seat_19 === 'A')
        updatedSeats[18] = BusSeatStatusEnum.Available;
      else (updatedSeats[18] = BusSeatStatusEnum.Taken);

      if (result[i].seat_20 === 'A')
        updatedSeats[19] = BusSeatStatusEnum.Available;
      else (updatedSeats[19] = BusSeatStatusEnum.Taken);

      if (result[i].seat_21 === 'A')
        updatedSeats[20] = BusSeatStatusEnum.Available;
      else (updatedSeats[20] = BusSeatStatusEnum.Taken);

      if (result[i].seat_22 === 'A')
        updatedSeats[21] = BusSeatStatusEnum.Available;
      else (updatedSeats[21] = BusSeatStatusEnum.Taken);

      if (result[i].seat_23 === 'A')
        updatedSeats[22] = BusSeatStatusEnum.Available;
      else (updatedSeats[22] = BusSeatStatusEnum.Taken);

      if (result[i].seat_24 === 'A')
        updatedSeats[23] = BusSeatStatusEnum.Available;
      else (updatedSeats[23] = BusSeatStatusEnum.Taken);

      if (result[i].seat_25 === 'A')
        updatedSeats[24] = BusSeatStatusEnum.Available;
      else (updatedSeats[24] = BusSeatStatusEnum.Taken);

      if (result[i].seat_26 === 'A')
        updatedSeats[25] = BusSeatStatusEnum.Available;
      else (updatedSeats[25] = BusSeatStatusEnum.Taken);

      if (result[i].seat_27 === 'A')
        updatedSeats[26] = BusSeatStatusEnum.Available;
      else (updatedSeats[26] = BusSeatStatusEnum.Taken);

      if (result[i].seat_28 === 'A')
        updatedSeats[27] = BusSeatStatusEnum.Available;
      else (updatedSeats[27] = BusSeatStatusEnum.Taken);
    }
    // Update the state with the new array
    setSeats(updatedSeats);

  }

  useState(() => {
    fetchSeats();
  }, [Price_given, Routeno_given, Busno_given]);

  const handleSubmission = async () => {
    // check if any is selected, if not throw a toast
    if (selectedSeats.length === 0) {
      toast({
        title: "Error: No Seats Selected",
        description: "Please select a seat to proceed.",
        type: "error"
      })
      return;
    }

    // check again if any selected seat is available in database
    let ___result___ = database.sql`SELECT * FROM Seats_Info WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given}`;
    console.log("Result", ___result___);
    let flag = true;
    for (let i = 0; i < selectedSeats.length; i++) {
      if (areAvailable(selectedSeats[i].seat, ___result___) === false) {
        flag = false;
        break;
      }
    }

    if (flag === false) {
      toast({
        title: "Error: Seat Taken",
        description: "The seats you selected are already taken in the database. Updating the seats.",
        type: "error"
      })

      fetchSeatsandsetTaken();

      return;
    }
    else {
      for (let i = 0; i < selectedSeats.length; i++) {
        let _result_ = await database.sql`UPDATE Seats_Info SET seat_${selectedSeats[i].seat} = 'NA' WHERE route_no = ${Routeno_given} AND bus_no = ${Busno_given} AND price = ${Price_given} AND seat_${selectedSeats[i].seat} = 'A' AND Depart_Loc = ${Depart_Loc_given} AND Arr_Loc = ${Arr_Loc_given} AND Date = ${Date_given} AND Month = ${Month_given} AND Year = ${Year_given} AND Time_Hour = ${Time_Hour_given} AND Time_AM_PM = ${Time_AM_PM_given}`;
        console.log(_result_);
        // now insert data into Bookings table
        let __result__ = await database.sql`INSERT INTO Bookings (route_no, bus_no, price, seat_no, Depart_Loc, Arr_Loc, Time_Hour, Time_AM_PM, Date, Month, Year, Email) VALUES (${Routeno_given}, ${Busno_given}, ${Price_given}, ${selectedSeats[i].seat}, ${Depart_Loc_given}, ${Arr_Loc_given}, ${Time_Hour_given}, ${Time_AM_PM_given}, ${Date_given}, ${Month_given}, ${Year_given}, 'user@example.com');`; // update email later
        console.log(__result__);
      }
      toast({
        title: "Success: Seats Booked",
        description: "The seats you selected have been successfully booked.",
        type: "success"
      })
    }
    return;
  }

  const clearSeats = () => {
    // check if any is selected, if not throw a toast
    if (selectedSeats.length === 0) {
      toast({
        title: "Error: No Seats Selected",
        description: "Please select a seat to clear.",
        type: "error"
      })
      return;
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
  }

  return (
    <Dialog
    >
      <Toaster
        type="error"
      ></Toaster>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <ArrowRightIcon className="h-4 w-4" />
          <span className="sr-only">View route</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
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
                  <div className="col-span-8">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">1</span>
                        {seats[0] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(0, 1, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[0] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(0, 1, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(0, 1, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}

                        {seats[4] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(4, 1, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[4] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(4, 1, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(4, 1, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[8] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(8, 1, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[8] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(8, 1, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(8, 1, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[12] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(12, 1, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[12] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(12, 1, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(12, 1, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[16] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(16, 1, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[16] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(16, 1, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(16, 1, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[20] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(20, 1, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[20] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(20, 1, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(20, 1, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[24] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(24, 1, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[24] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(24, 1, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(24, 1, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">2</span>
                        {seats[1] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(1, 2, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[1] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(1, 2, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(1, 2, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[5] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(5, 2, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[5] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(5, 2, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(5, 2, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[9] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(9, 2, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[9] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(9, 2, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(9, 2, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[13] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(13, 2, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[13] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(13, 2, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(13, 2, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[17] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(17, 2, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[17] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(17, 2, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(17, 2, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[21] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(21, 2, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[21] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(21, 2, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(21, 2, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[25] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(25, 2, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[25] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(25, 2, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(25, 2, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">3</span>
                        {seats[2] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(2, 3, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[2] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(2, 3, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(2, 3, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[6] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(6, 3, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[6] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(6, 3, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(6, 3, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[10] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(10, 3, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[10] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(10, 3, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(10, 3, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[14] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(14, 3, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[14] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(14, 3, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(14, 3, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[18] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(18, 3, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[18] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(18, 3, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(18, 3, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[22] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(22, 3, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[22] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(22, 3, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(22, 3, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[26] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(26, 3, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[26] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(26, 3, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(26, 3, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}

                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">4</span>
                        {seats[3] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(3, 4, 1)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            1
                          </button>
                        ) : seats[3] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(3, 4, 1)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            1
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(3, 4, 1)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              1
                            </button>
                          )}
                        {seats[7] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(7, 4, 2)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            2
                          </button>
                        ) : seats[7] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(7, 4, 2)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            2
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(7, 4, 2)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              2
                            </button>
                          )}
                        {seats[11] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(11, 4, 3)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            3
                          </button>
                        ) : seats[11] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(11, 4, 3)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            3
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(11, 4, 3)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              3
                            </button>
                          )}
                        {seats[15] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(15, 4, 4)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            4
                          </button>
                        ) : seats[15] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(15, 4, 4)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            4
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(15, 4, 4)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              4
                            </button>
                          )}
                        {seats[19] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(19, 4, 5)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            5
                          </button>
                        ) : seats[19] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(19, 4, 5)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            5
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(19, 4, 5)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              5
                            </button>
                          )}
                        {seats[23] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(23, 4, 6)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            6
                          </button>
                        ) : seats[23] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(23, 4, 6)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            6
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(23, 4, 6)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              6
                            </button>
                          )}
                        {seats[27] === BusSeatStatusEnum.Available ? (
                          <button onClick={() => switchSeat(27, 4, 7)}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                            7
                          </button>
                        ) : seats[27] === BusSeatStatusEnum.Selected ? (
                          <button onClick={() => switchSeat(27, 4, 7)}
                            className="w-8 h-8 bg-gray-800 dark:bg-gray-200 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                            7
                          </button>
                        )
                          : (
                            <button onClick={() => switchSeat(27, 4, 7)}
                              className="w-8 h-8 bg-red-500 dark:bg-red-300 rounded-sm hover:bg-red-800 hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors text-white">
                              7
                            </button>
                          )}

                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-gray-100 max-w-[40vh] dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Selected Seats</h3>
                    <div className="max-h-[36vh] max-w-[50vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }} >
                      <div className="space-y-4">
                        {selectedSeats.map((seat, index) => (

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-primary rounded-sm" />
                              <span className="text-sm">Seat {seat.rowNo}-{seat.seatNo}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">${Price_given}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex justify-end gap-4">
                <Button onClick={() => clearSeats()}
                  variant="outline">Clear</Button>
                <Button onClick={() => handleSubmission()}
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

function areAvailable(index, result) {
  for (let i = 0; i < result.length; i++) {
    if (index === 0) {
      if (result[i].seat_1 === 'A')
        return true;
      else
        return false;
    }

    if (index === 1) {
      if (result[i].seat_2 === 'A')
        return true;
      else
        return false;
    }

    if (index === 2) {
      if (result[i].seat_3 === 'A')
        return true;
      else
        return false;
    }

    if (index === 3) {
      if (result[i].seat_4 === 'A')
        return true;
      else
        return false;
    }

    if (index === 4) {
      if (result[i].seat_5 === 'A')
        return true;
      else
        return false;
    }

    if (index === 5) {
      if (result[i].seat_6 === 'A')
        return true;
      else
        return false;
    }

    if (index === 6) {
      if (result[i].seat_7 === 'A')
        return true;
      else
        return false;
    }

    if (index === 7) {
      if (result[i].seat_8 === 'A')
        return true;
      else
        return false;
    }

    if (index === 8) {
      if (result[i].seat_9 === 'A')
        return true;
      else
        return false;
    }

    if (index === 9) {
      if (result[i].seat_10 === 'A')
        return true;
      else
        return false;
    }

    if (index === 10) {
      if (result[i].seat_11 === 'A')
        return true;
      else
        return false;
    }

    if (index === 11) {
      if (result[i].seat_12 === 'A')
        return true;
      else
        return false;
    }

    if (index === 12) {
      if (result[i].seat_13 === 'A')
        return true;
      else
        return false;
    }

    if (index === 13) {
      if (result[i].seat_14 === 'A')
        return true;
      else
        return false;
    }

    if (index === 14) {
      if (result[i].seat_15 === 'A')
        return true;
      else
        return false;
    }

    if (index === 15) {
      if (result[i].seat_16 === 'A')
        return true;
      else
        return false;
    }

    if (index === 16) {
      if (result[i].seat_17 === 'A')
        return true;
      else
        return false;
    }

    if (index === 17) {
      if (result[i].seat_18 === 'A')
        return true;
      else
        return false;
    }

    if (index === 18) {
      if (result[i].seat_19 === 'A')
        return true;
      else
        return false;
    }

    if (index === 19) {
      if (result[i].seat_20 === 'A')
        return true;
      else
        return false;
    }

    if (index === 20) {
      if (result[i].seat_21 === 'A')
        return true;
      else
        return false;
    }

    if (index === 21) {
      if (result[i].seat_22 === 'A')
        return true;
      else
        return false;
    }

    if (index === 22) {
      if (result[i].seat_23 === 'A')
        return true;
      else
        return false;
    }

    if (index === 23) {
      if (result[i].seat_24 === 'A')
        return true;
      else
        return false;
    }

    if (index === 24) {
      if (result[i].seat_25 === 'A')
        return true;
      else
        return false;
    }

    if (index === 25) {
      if (result[i].seat_26 === 'A')
        return true;
      else
        return false;
    }

    if (index === 26) {
      if (result[i].seat_27 === 'A')
        return true;
      else
        return false;
    }

    if (index === 27) {
      if (result[i].seat_28 === 'A')
        return true;
      else
        return false;
    }
  }
}

export default BusDialogue