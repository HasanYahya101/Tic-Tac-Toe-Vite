import React from 'react';
import { Button } from "../ui/button";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { cn } from "../../lib/utils";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../ui/date_location_dialog";
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Toaster } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import { Database } from '@sqlitecloud/drivers';


function formatDate(date, options) {
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function DateLoc() {

    const { toast } = useToast();

    const [date, setDate] = React.useState(new Date());
    const [dpartLocation, setdepartLocation] = React.useState("");
    const [arrLocation, setarrLocation] = React.useState("");

    // create a list of string locations
    const [locations, setLocations] = useState([]);

    let database = new Database('sqlitecloud://user:123456789@cznnewxyik.sqlite.cloud:8860/booking.db');


    useEffect(() => {
        async function fetchLocations() {
            let location = await database.sql`SELECT locations FROM Locations;`;
            // print the locations
            console.log(location);
            setLocations(location.map((location) => location.locations));
        }
        fetchLocations();
    }, []);

    return (
        <Dialog
        >
            <Toaster />
            <DialogTrigger>
                <Button
                    variant="outline"
                >Select Location and Date</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Date:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    <span>{formatDate(date, "PPPP")}</span>
                                ) : (
                                    <span className="text-muted-foreground">Select Date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus={date}
                                showOutsideDays={true}
                                disabled={(day) => day < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Departure Location:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Select>
                        <SelectTrigger className="w-[180px]"
                            onSelect={(value) => {
                                setdepartLocation(value)
                            }}
                        >
                            <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px]"
                        >
                            {locations.map((location) => (
                                <SelectItem value={location}>{location}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogHeader>
                    <h2 style={{ fontSize: "1.3rem" }}
                    >Choose Arrival Location:</h2>
                </DialogHeader>
                <div className='ml-5 mr-5'>
                    <Select>
                        <SelectTrigger className="w-[180px]"
                            onSelect={(value) => {
                                setarrLocation(value)
                            }}
                        >
                            <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]"
                        >
                            {locations.map((location) => (
                                <SelectItem value={location}>{location}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div
                    className="flex justify-end space-x-2 p-4 bg-card"
                >
                    <DialogClose>
                        <Button
                            variant="destructive"

                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="bg-primary"
                        onClick={() => {
                            toast({
                                title: "Error: Empty Fields",
                                description: "Please fill in all the required fields, and try again.",
                                type: "error"
                            })
                        }}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DateLoc;
