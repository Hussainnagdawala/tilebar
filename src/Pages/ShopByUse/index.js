import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { AppModal, CustomButton, CustomInput, CustomTable } from "../../common";

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  const acceptedcolumns = [
    { name: "#", selector: (row) => row?.index_number ?? 0 },
    {
      name: "Referral ID",
      selector: (row) => row?.referral_unique_id || "",
    },
    {
      name: "Patient Full Name",
      selector: (row) => `${row?.first_name} ${row?.last_name}` || "",
    },
    {
      name: "NHS Number",
      selector: (row) => row?.nhs_no || "",
    },
    { name: "Email", selector: (row) => row?.email || "" },
    { name: "Service", selector: (row) => row?.pathway_id?.name ?? "N/A" },
    { name: "Outcome", selector: (row) => row?.outcome || "" },
    { name: "Action", selector: (row) => row?.action ?? "" },
  ];

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item lg={6}>
          <CustomInput />
        </Grid>
        <Grid item lg={2}>
          <CustomButton
            type={"button"}
            onClick={handleToggleModal}
            variant={"contained"}
            buttonName={"Add Shop By Use"}
          />
        </Grid>
      </Grid>
      <Box>
        <CustomTable
          // isLoading={isReferralLoading}
          columns={acceptedcolumns}
          // data={referralData?.data.map((item, index) => ({
          //   ...item,
          //   index_number: index + 1,
          //   outcome: (
          //     <Box>
          //       {/* <TableStatus
          //         status={item?.outcome === "1" ? 4 : Number(item?.outcome)}
          //         label={renderOutComeLabelName(item?.outcome)}
          //       /> */}
          //     </Box>
          //   ),
          //   action: (
          //     <Box>
          //       {
          //         // <CustomDropDownMenu
          //         //   anchorEl={anchorEls[index]}
          //         //   open={Boolean(anchorEls[index])}
          //         //   onClose={() => handleClose(index)}
          //         //   handleClick={(event) =>
          //         //     handleClick(event, index)
          //         //   }
          //         //   data={item}
          //         //   menuItem={renderMenuItem}
          //         // />
          //       }
          //     </Box>
          //   ),
          // }))}
        />
      </Box>
      {openModal && (
        <AppModal
          open={openModal}
          handleCloseOpen={handleToggleModal}
        >
          
        </AppModal>
      )}
    </>
  );
};

export default Index;
