import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "../ui/bus-dialog-ui";


function BusDialogue() {

  return (
    <Dialog
    >

      <DialogTrigger asChild>
        <Button variant="outline">Select Seats</Button>
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
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          1
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          2
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          3
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          4
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          5
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          6
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          7
                        </button>
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">2</span>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          1
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          2
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          3
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          4
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          5
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          6
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          7
                        </button>
                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">3</span>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          1
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          2
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          3
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          4
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          5
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          6
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          7
                        </button>

                      </div>
                      <div className="col-span-1 flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">4</span>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          1
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          2
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          3
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          4
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          5
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          6
                        </button>
                        <button
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">
                          7
                        </button>

                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4">Selected Seats</h3>
                    <div className="max-h-[36vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }} >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 1-1</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 2-2</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                            <span className="text-sm">Seat 3-3</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">$20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 flex justify-end gap-4">
                <Button variant="outline">Clear</Button>
                <Button>Continue</Button>
              </div>
            </div>
          </div>


        </Card>
      </DialogContent>
    </Dialog>

  )
}

export default BusDialogue
