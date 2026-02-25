import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as FileSaver from 'file-saver';
import { unparse } from 'papaparse';

const PaymentsTable = ({ data }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleDetailsClick = (row) => {
    setSelectedDetails(row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedDetails(null);
  };

  // Function to Export CSV
  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    // Convert data into structured format for CSV
    const csvData = data.flatMap((row) =>
      row.details.map((detail) => ({
        "College Name": row.userId.college_name,
        "Event Name": detail.eventName,
        "Event Category": detail.categoryName,
        "Order ID": row.orderId,
        "Payment ID": row.paymentId,
        "User Email": row.userId.email,
        "Amount": detail.amount,
        "Type": detail.type,
        "Registration ID": detail.regId,
        "Timestamp": `${new Date(row.timestamp.toLocaleString()).toLocaleString()}`,
      }))
    );

    // Convert JSON to CSV using papaparse
    const csv = unparse(csvData);

    // Convert CSV string to a Blob
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Save file using FileSaver
    FileSaver.saveAs(blob, 'PaymentsData.csv');
  };

  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="overflow-x-auto mt-7 w-full">
      {/* Export CSV Button */}
      <button
        onClick={exportToCSV}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4 ml-4"
      >
        Export to CSV
      </button>

      <div className="my-4 ml-4">
        <h2 className="text-xl">Total Amount : {totalAmount}</h2>
      </div>

      <table className="min-w-full bg-black text-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-black border-b border-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Order ID
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Payment ID
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              College Name
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              User ID
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Amount
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t border-white ${
                index % 2 === 0 ? 'bg-black' : 'bg-gray-900'
              }`}
            >
              <td className="py-3 px-4 text-sm">{row.orderId}</td>
              <td className="py-3 px-4 text-sm">{row.paymentId}</td>
              <td className="py-3 px-4 text-sm">{row.userId.college_name}</td>
              <td className="py-3 px-4 text-sm">{row.userId.email}</td>
              <td className="py-3 px-4 text-sm">{row.amount}</td>
              <td className="py-3 px-4 text-sm">{new Date(row.timestamp.toLocaleString()).toLocaleString()}</td>
              <td className="py-3 px-4 text-sm">
                <button
                  onClick={() => handleDetailsClick(row)}
                  className="bg-transparent text-white border-2 border-white py-1 px-3 rounded-lg"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for showing details */}
      {selectedDetails && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger />
          <DialogContent className="bg-black text-white p-8 rounded-lg max-w-md mx-auto">
            <DialogTitle className="text-xl font-semibold">
              Payment Details
            </DialogTitle>
            <DialogDescription className="mt-4">
              <div className="mt-3">
                {selectedDetails.details?.map((elmt, inx) => (
                  <div
                    key={inx}
                    className="grid grid-cols-2 gap-4 p-4 border border-white rounded-lg"
                  >
                    <div>
                      <p>
                        <strong>Amount:</strong> {elmt.amount}
                      </p>
                      <p>
                        <strong>Event Name:</strong> {elmt.eventName}
                      </p>
                      <p>
                        <strong>Event Category:</strong> {elmt.categoryName}
                      </p>
                      <p>
                        <strong>Type:</strong> {elmt.type}
                      </p>
                      <p>
                        <strong>Registration ID:</strong> {elmt.regId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogDescription>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bg-white text-black py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentsTable;
