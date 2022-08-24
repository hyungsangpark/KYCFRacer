import React from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { createCodeBlock } from "../../api/Api";

function AddCodeBlockPage() {
  const [language, setLanguage] = React.useState("");
  const [code, setCode] = React.useState("");
  const [time, setTime] = React.useState("");
  const [openLoading, setOpenLoading] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const times = ["30", "60", "90", "120"];
  const languages = ["kycf", "bible"];

  const handleSubmit = async () => {
    console.log(`Language: ${language}`);
    console.log(`Code: ${code}`);
    console.log(`Time: ${time}`);

    setOpenLoading(true);
    const codeBlockResponse = await createCodeBlock({ language, code, time });
    const newCodeBlock = codeBlockResponse.data;

    setOpenLoading(false);
    setOpenSuccess(true);
    setLanguage("");
    setCode("");
    setTime("");
    console.log("newCodeBlock", newCodeBlock);
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      marginY={2}
    >
      <Typography variant="h1" paddingY={3}>
        Typing Text 넣는 페이지
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"40rem"}
        marginY={2}
      >
        <Typography variant="h3" paddingRight={10}>
          Time
        </Typography>
        <FormControl>
          <InputLabel id="time-select-label">Time</InputLabel>
          <Select
            labelId="time-select-label"
            id="time-select"
            value={time}
            label="Time"
            sx={{ width: "15rem" }}
            onChange={(e) => setTime(String(e.target.value))}
          >
            {times.map((time, index) => (
              <MenuItem key={`time_item_${index}`} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"40rem"}
        marginY={2}
      >
        <Typography variant="h3" paddingRight={10}>
          Language
        </Typography>
        <FormControl>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            label="Language"
            sx={{ width: "15rem" }}
            onChange={(e) => setLanguage(String(e.target.value))}
          >
            {languages.map((language, index) => (
              <MenuItem key={`language_item_${index}`} value={language}>
                {language.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"40rem"}
        marginY={2}
      >
        <Typography variant="h3" paddingRight={10}>
          Text
        </Typography>
        <TextField
          id={"text-field"}
          label={"Text"}
          multiline
          placeholder={"Lorem ipsum dolor sit."}
          variant={"outlined"}
          fullWidth
          value={code}
          onChange={(e) => setCode(String(e.target.value))}
        />
      </Box>

      <Button variant={"contained"} onClick={handleSubmit}>
        Submit
      </Button>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success" elevation={2}>
          Creation Success!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AddCodeBlockPage;
