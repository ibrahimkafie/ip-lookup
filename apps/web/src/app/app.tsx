import { useState } from 'react';
import { IPInfo } from '@max-mind/core/models';

import { Content, ErrorMsg, Header, IpList, SearchBox } from './components';
import { appService } from './app.service';

/**
 * The shape of the application state
 */
interface AppState {
  /**
   * An array of IPInfo objects representing the current list of IP addresses and their associated information.
   */
  ipItemsInfo?: IPInfo[];

  /**
   * An error message to display if there is a problem fetching or displaying IP information.
   */
  error?: string;

  /**
   * A boolean value indicating whether the application is currently loading data.
   */
  loading?: boolean;
}

export const App = () => {
  const [state, setState] = useState<AppState>({});

  const handleLookup = async (ipList: string[]) => {
    try {
      // exist when loading
      if (state.loading) return;

      // reset all state values
      setState({ loading: true, error: undefined, ipItemsInfo: undefined });

      // get IP addresses info
      const result = await appService.getIPAddressesInfo(ipList);

      // update state with result
      setState({ error: undefined, loading: false, ipItemsInfo: result });
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (error: string) => {
    setState({ ...state, loading: false, error });
  };

  return (
    <Content>
      <Header />
      <SearchBox lookup={handleLookup} onError={handleError} />
      <ErrorMsg message={state.error} />
      <IpList items={state.ipItemsInfo} loading={state.loading} />
    </Content>
  );
};

export default App;
