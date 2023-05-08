import { IPInfo } from '@ip-lookup/core/models';
import Divider from '@mui/material/Divider';
import IpItem from './ip-item';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type DisplayMode = 'view' | 'json';

type Props = {
  /**
   * An array of IPInfo objects to display in the list.
   */
  items: IPInfo[] | undefined;

  /**
   * A boolean value indicating whether the component is currently loading data.
   */
  loading: boolean | undefined;
};

export const IpList = ({ items, loading }: Props) => {
  const [mode, setMode] = useState<DisplayMode>('view');

  const handleDisplayMode = (event: React.MouseEvent<HTMLElement>, value: DisplayMode) => {
    setMode(value);
  };

  // Loading state
  if (loading) {
    return <CircularProgress size={120} thickness={2} className="mt-20" />;
  }

  // Display IP list result
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
          <ToggleButton value="view">VIEW</ToggleButton>
          <ToggleButton value="json">JSON</ToggleButton>
        </ToggleButtonGroup>

        <Divider>IP Lookup Result</Divider>

        {mode === 'view' ? (
          items.map((item, i) => <IpItem key={i} item={item} />)
        ) : (
          <pre>{JSON.stringify(items, null, 2)}</pre>
        )}
      </div>
    );
  }

  // Display IP svg image
  return <img className="opacity-[0.03] fixed top-96" src="/ip-address.svg" alt="Ip Address" />;
};

export default IpList;
