import React from "react";
import { styled } from "@mui/material/styles";
import {
  buttonBaseClasses,
  FormControl,
  InputLabel,
  MenuItem,
  menuItemClasses,
  Select,
  selectClasses,
} from "@mui/material";
import theme from "../../utils/Theme";

const CustomSelect = styled(Select)(({ theme }) => ({
  // backgroundColor: theme.palette.secondary.dark,
  // color: theme.palette.secondary.light,
  borderRadius: 1000,
  width: "100%",
  textAlign: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  height: 56,
}));

const CustomOption = styled(MenuItem)(({ theme }) => ({
  [`&.${menuItemClasses.root}`]: {
    // "&.Mui-selected": {
    //   backgroundColor: theme.palette.primary.dark,
    // },
    // "&:hover": {
    //   backgroundColor: theme.palette.secondary.dark,
    // },
    textTransform: "uppercase",
  },
}));

interface Props {
  options: string[];
  onSelect: (option: number) => void;
  selectedIndex: number;
  style?: React.CSSProperties;
}

/**
 *
 * @param options The string array of options that can be chosen
 * @param onSelect function that is called when option is changed
 * @param selectedIndex The index of the option in the options array
 * @param style CSSProperties object of this component
 * @constructor
 */
function SettingSelector({ options, onSelect, selectedIndex, style }: Props) {
  return (
    <FormControl sx={{ ...style, width: "100%" }}>
      <CustomSelect
        value={options[selectedIndex]}
        onChange={(event) =>
          onSelect(options.indexOf(event.target.value as string))
        }
      >
        {options.map((option, index) => (
          <CustomOption key={index} value={option}>
            {option}
          </CustomOption>
        ))}
      </CustomSelect>
    </FormControl>
  );
}

export default SettingSelector;
