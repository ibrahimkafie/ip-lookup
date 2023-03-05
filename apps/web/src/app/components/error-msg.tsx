import Alert from '@mui/material/Alert';

type Props = {
  message: string | undefined;
};
export const ErrorMsg = ({ message }: Props) => {
  if (message) {
    return (
      <Alert severity="error" className="!mt-4 w-full box-border z-10">
        {message}
      </Alert>
    );
  }

  return null;
};

export default ErrorMsg;
