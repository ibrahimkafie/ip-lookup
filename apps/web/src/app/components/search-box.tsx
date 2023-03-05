import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

type Props = {
  lookup: (ipList: string[]) => void;
  onError: (message: string) => void;
};

export const SearchBox = ({ lookup, onError }: Props) => {
  const [value, setValue] = useState('');

  const handleLookup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!value) return;

    // Split the list of IP addresses by comma
    // Remove duplicated items
    const ipList = [...new Set(value.split(',').map((item) => item.trim()))];

    if (ipList.length > 10) {
      onError(
        'Maximum number of IP addresses exceeded. Please enter up to 10 IP addresses separated by commas.'
      );
      return;
    }

    const isIPsValid = validateIPAddresses(ipList);

    if (isIPsValid) {
      lookup(ipList);
    } else {
      onError('Invalid IP list format');
    }
  };

  function validateIPAddresses(ipList: string[]) {
    // Regular expression to match IP addresses
    const ipRegExp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

    // Loop through each IP address and check if it matches the regular expression
    for (let i = 0; i < ipList.length; i++) {
      const ipAddress = ipList[i].trim();
      if (!ipRegExp.test(ipAddress)) {
        // If any IP address doesn't match the format, return false
        return false;
      }
    }

    // All IP addresses match the format, return true
    return true;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onError('');
  };

  return (
    <>
      <Paper component="form" className="flex w-full py-2 px-3 box-border my-4">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter one or more IP addresses"
          inputProps={{ 'aria-label': 'IP addresses' }}
          onChange={handleChange}
        />
        <Divider className="!h-7 !m-2" orientation="vertical" />
        <Button variant="contained" disableElevation onClick={handleLookup} type="submit">
          IP Lookup
        </Button>
      </Paper>

      <Typography variant="body1" className="text-center !tracking-widest md:!text-sm">
        For example, try:<strong> 169.255.0.0 </strong> OR <strong>192.0.3.0, 192.0.24.21</strong>
      </Typography>
    </>
  );
};

export default SearchBox;
