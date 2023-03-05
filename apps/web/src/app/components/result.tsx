import { IPInfo } from '@max-mind/core/models';
import Divider from '@mui/material/Divider';
import IpInfo from './ip-info';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  items: IPInfo[] | undefined;
  loading: boolean | undefined;
};

export const ResultItems = ({ items, loading }: Props) => {
  const [mode, setMode] = useState('items');

  const handleDisplayMode = (event: React.MouseEvent<HTMLElement>, value: string) => {
    setMode(value);
  };

  if (loading) {
    return <CircularProgress size={120} thickness={2} className="mt-20" />;
  }

  if (items) {
    return (
      <div className="w-full !mt-10">
        <ToggleButtonGroup
          className="!flex justify-end"
          size="small"
          value={mode}
          exclusive
          onChange={handleDisplayMode}
        >
          <ToggleButton value="items">VIEW</ToggleButton>
          <ToggleButton value="json">JSON</ToggleButton>
        </ToggleButtonGroup>

        <Divider>IP Lookup Result</Divider>

        {mode === 'items' ? (
          items.map((item, i) => <IpInfo key={i} item={item} />)
        ) : (
          <pre>{JSON.stringify(items, null, 2)}</pre>
        )}
      </div>
    );
  }

  return <img className="opacity-[0.03] fixed top-96" src="/ip-address.svg" alt="Ip Address" />;
};

export default ResultItems;
