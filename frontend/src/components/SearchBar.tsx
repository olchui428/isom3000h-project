import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";

type SearchableItem = "accreditation" | "issuer" | "certificate" | "applicant";

type SearchItemOption = {
  value: SearchableItem;
  optionLabel: string;
  optionIcon: React.ReactNode;
  textInputLabel: string;
};

const searchItemOptions: SearchItemOption[] = [
  {
    value: "accreditation",
    optionLabel: "Accreditation",
    optionIcon: <WorkspacePremiumIcon style={{ height: 24, width: 24 }} />,
    textInputLabel: "Accreditation ID",
  },
  {
    value: "issuer",
    optionLabel: "Issuer",
    optionIcon: <BusinessIcon style={{ height: 24, width: 24 }} />,
    textInputLabel: "Issuer Address",
  },
  {
    value: "certificate",
    optionLabel: "Certificate",
    optionIcon: <DescriptionIcon style={{ height: 24, width: 24 }} />,
    textInputLabel: "Certificate ID",
  },
  {
    value: "applicant",
    optionLabel: "Applicant",
    optionIcon: <PersonIcon style={{ height: 24, width: 24 }} />,
    textInputLabel: "Applicant Address",
  },
];

function SearchBar() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [searchItem, setSearchItem] = useState<SearchableItem>("accreditation");

  const handleSearch = () => {
    const inputTrimmed = input.trim();
    if (!inputTrimmed) return;

    switch (searchItem) {
      case "accreditation":
        router.push(`/accreditation/${inputTrimmed}`);
        break;
      case "issuer":
        router.push(`/issuer/${inputTrimmed}`);
        break;
      case "certificate":
        router.push(`/certificate/${inputTrimmed}`);
        break;
      case "applicant":
        router.push(`/applicant/${inputTrimmed}`);
        break;
    }
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
    >
      <Box sx={{ width: "100%", display: "flex", gap: 3 }}>
        <FormControl>
          <InputLabel>Search Item</InputLabel>
          <Select
            label="Search Item"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value as SearchableItem)}
            sx={{ width: 200 }}
          >
            {searchItemOptions.map(({ optionLabel, optionIcon, value }) => (
              <MenuItem key={value} value={value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  {optionIcon}
                  <span>{optionLabel}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label={searchItemOptions.find(({ value }) => value === searchItem)?.textInputLabel}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ flex: 1 }}
        />
      </Box>
      <Button size="large" onClick={handleSearch} variant="contained">
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
