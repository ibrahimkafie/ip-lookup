import Typography from '@mui/material/Typography';

export const Header = () => {
  return (
    <Typography variant="h4" align="center" className="!mb-6 md:!text-2xl md:!mb-2">
      <strong className="text-gray-800">IP-Lookup</strong> <br />
      <small className="font-light">Look up IP Address Demo</small>
    </Typography>
  );
};

export default Header;
