import { Box, Grid2 as Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DateLabel } from "@components/label/date.label";

const GenerateSpine: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<
    Array<{
      accession_no: string;
      status: string;
      price: number;
      createdAt: string; // Assuming createdAt is a date string
      book: {
        classification: string;
      };
    }>
  >([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dataParam = queryParams.get("data"); // Extract `data` parameter from URL

    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam); // Parse stringified JSON

        if (
          Array.isArray(parsedData) &&
          parsedData.every(
            (item) =>
              typeof item.accession_no === "string" &&
              typeof item.createdAt === "string" &&
              item.book &&
              typeof item.book.classification === "string"
          )
        ) {
          setData(parsedData); // Set the parsed and validated data
        } else {
          console.error(
            "Invalid data format: Data should be an array of objects with the expected fields."
          );
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }
  }, [location.search]);

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=800,width=1200");
    printWindow?.document.write("<html><head><style>");

    // Print-specific styles
    printWindow?.document.write(`
	  /* General Styles */
	  body {
		font-family: Arial, sans-serif;
		font-size: 12px; /* Adjust font size for print readability */
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	  }
	  .print-container {
		display: grid; /* Use grid layout for consistent rows */
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Flexible columns */
		gap: 10px; /* Spacing between boxes */
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
	  }
	  .print-item {
		border: 1px solid #000;
		border-radius: 4px;
		padding: 8px;
		text-align: center;
		box-sizing: border-box;
	  }
	  .print-item div {
		margin-bottom: 4px; /* Spacing between child elements */
	  }
	  .print-item p {
		margin: 0;
		padding: 0;
	  }
  
	  /* Print Media-Specific Styles */
	  @media print {
		body {
		  margin: 0;
		  padding: 0;
		  width: 100%;
		}
		.print-container {
		  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Ensure grid layout in print */
		  gap: 10px;
		  padding: 0;
		}
	  }
	`);

    printWindow?.document.write("</style></head><body>");

    // Add the content to print
    const printContent =
      document.getElementById("print-content")?.innerHTML || "";
    printWindow?.document.write(
      `<div class="print-container">${printContent}</div>`
    );

    printWindow?.document.write(
      "<script>window.print(); window.close();</script>"
    );
    printWindow?.document.close();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2, float: "right" }}
      >
        {/* To Do - Missing Print Format */}
        Print
      </Button>

      <Box id="print-content" className="print-container">
        <Grid container direction="row" spacing={2}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <Grid size={2} key={index} className="print-item">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // Align items vertically
                    border: "1px solid #000",
                    borderRadius: "4px",
                    padding: 2,
                    justifyContent: "space-between",
                  }}
                >
                  {/* Accession No Section */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 1,
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {item.accession_no}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {item.book.classification}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      <DateLabel date={item.createdAt} />
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", marginTop: 4 }}
            >
              No data available.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default GenerateSpine;
