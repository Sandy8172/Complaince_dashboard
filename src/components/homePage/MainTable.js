import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableHeaders from "./TableHeaders";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./MainTable.css";

const MainTable = () => {
  const [inputValues, setInputValues] = useState([]);

  const BackEnd_Data = useSelector((state) => state.BackEnd_Data);

  const handleInputChange = (index, field, value) => {
    const updatedValues = [...inputValues];
    if (!updatedValues[index]) {
      updatedValues[index] = {};
    }
    updatedValues[index][field] = value;
    setInputValues(updatedValues);
  };
  const handleSubmit = () => {
    if (inputValues.length < BackEnd_Data.length) {
      alert("Please fill in the values");
      return;
    }

    const isEmpty = inputValues.some((input) => {
      return !input.MtoM;
    });

    if (isEmpty) {
      console.log(isEmpty);
      alert("Please fill in all fields before submitting.");
      return;
    } else {
      const submittedData = inputValues.map((input, index) => {
        return {
          Id: BackEnd_Data[index].Name,
          Alloted_Abbr: BackEnd_Data[index].Abbr,
          Executed_Abbr:
            input?.Abbr !== undefined ? input?.Abbr : BackEnd_Data[index].Abbr,
          Alloted_Qty: BackEnd_Data[index].Quantity,
          Executed_Qty:
            input?.Quantity !== undefined
              ? input?.Quantity
              : BackEnd_Data[index].Quantity,
          MtoM: input?.MtoM,
        };
      });
      console.log("Submitted Data:", submittedData);
      alert("successfully submitted");
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, height: "62.3vh" }}>
          <TableContainer sx={{ height: "100%" }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <TableHeaders />
              <TableBody>
                {BackEnd_Data.map((row, index) => {
                  return (
                    <TableRow hover key={index} sx={{ cursor: "pointer" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.Id}
                      </TableCell>
                      <TableCell align="center">{row.Name}</TableCell>
                      <TableCell align="center">{row.Team}</TableCell>
                      <TableCell align="center">{row.Strategy_Type}</TableCell>
                      <TableCell align="center">{row.Strategy_Name}</TableCell>
                      <TableCell align="center">{row.MtoM}</TableCell>
                      <TableCell align="center">{row.Abbr}</TableCell>
                      <TableCell align="center">
                        <input
                          style={{ width: "4.5rem" }}
                          value={
                            inputValues[index]?.Abbr !== undefined
                              ? inputValues[index]?.Abbr
                              : row.Abbr
                          }
                          onChange={(e) =>
                            handleInputChange(index, "Abbr", e.target.value.toUpperCase())
                          }
                          type="text"
                        />
                      </TableCell>
                      <TableCell align="center">{row.Quantity}</TableCell>
                      <TableCell align="center">
                        <input
                          style={{ width: "4.5rem" }}
                          value={
                            inputValues[index]?.Quantity !== undefined
                              ? inputValues[index]?.Quantity
                              : row.Quantity
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "Quantity",
                              e.target.value
                            )
                          }
                          type="number"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <input
                          style={{ width: "4.5rem" }}
                          value={inputValues[index]?.MtoM || ""}
                          onChange={(e) =>
                            handleInputChange(index, "MtoM", e.target.value)
                          }
                          type="number"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <div>
        <Link to={"/dashboard/dataTable"}>
          <Button
            sx={{
              ml: 2,
            }}
            variant="contained"
          >
            Fech Data
          </Button>
        </Link>

        <Button
          sx={{
            float: "right",
            mr: 2,
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default MainTable;
