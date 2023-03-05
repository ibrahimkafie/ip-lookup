import { useState } from 'react';
import { IPInfo } from '@max-mind/core/models';

import { Content, ErrorMsg, Header, ResultItems, SearchBox } from './components';
import { appService } from './app.service';

interface AppState {
  result?: IPInfo[];
  error?: string;
  loading?: boolean;
}

export const App = () => {
  const [state, setState] = useState<AppState>({});

  const handleLookup = async (ipList: string[]) => {
    try {
      // exist when loading
      if (state.loading) return;

      // reset all state values
      setState({ loading: true, error: undefined, result: undefined });

      // get IP addresses info
      const result = await appService.getIPAddressesInfo(ipList);

      // update state with result
      setState({ error: undefined, loading: false, result });
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (message: string) => {
    setState({ ...state, loading: false, error: message });
  };

  return (
    <Content>
      <Header />
      <SearchBox lookup={handleLookup} onError={handleError} />
      <ErrorMsg message={state.error} />
      <ResultItems items={state.result} loading={state.loading} />
    </Content>
  );
};

export default App;
