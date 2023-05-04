import Layout from "@/components/Layout";
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
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

type SearchableItem = "accreditation" | "issuer" | "certificate" | "applicant";

type SearchItemOption = {
  value: SearchableItem;
  optionLabel: string;
  textInputLabel: string;
};

const searchItemOptions: SearchItemOption[] = [
  {
    value: "accreditation",
    optionLabel: "Accreditation",
    textInputLabel: "Accreditation ID",
  },
  {
    value: "issuer",
    optionLabel: "Issuer",
    textInputLabel: "Issuer Address",
  },
  {
    value: "certificate",
    optionLabel: "Certificate",
    textInputLabel: "Certificate ID",
  },
  {
    value: "applicant",
    optionLabel: "Applicant",
    textInputLabel: "Applicant Address",
  },
];

function Search() {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [searchItem, setSearchItem] = useState<SearchableItem>("accreditation");

  const handleSearch = () => {
    const inputTrimmed = input.trim();
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
    <Layout title="Search">
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl required>
          <InputLabel>Search Item</InputLabel>
          <Select
            label="Search Item"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value as SearchableItem)}
          >
            {searchItemOptions.map(({ optionLabel, value }) => (
              <MenuItem key={value} value={value}>
                {optionLabel}
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
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          disabled={input.trim() === ""}
        >
          Search
        </Button>
      </Box>
    </Layout>
  );
}

export default Search;
