import React from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./errorcard.css";

const ErrorCard = ({ msg = "Failed to send OTP", onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: "error-dialog" }}>
      <DialogContent>
        <div className="error-content">
          <CancelIcon className="error-icon" />
          <Typography className="error-text">{msg}</Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorCard;
