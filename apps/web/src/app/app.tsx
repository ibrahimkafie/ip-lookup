import { Content, ErrorMsg, Header, IpList, SearchBox } from './components';
import { useLookup } from './hooks';

export const App = () => {
  const { state, handleLookup, handleError } = useLookup();

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
