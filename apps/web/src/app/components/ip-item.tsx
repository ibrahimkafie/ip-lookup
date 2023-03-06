import { IPInfo } from '@max-mind/core/models';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';

type Props = {
  /**
   * The IP info object to display in the item.
   */
  item: IPInfo;
};

export const IpItem = ({ item }: Props) => {
  return (
    <TableContainer component={Paper} className="my-4">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={2}
              className={
                '!py-2 ' +
                (item.error ? '!bg-red-50 !text-red-400' : '!bg-green-50 !text-green-600')
              }
            >
              {item.error ?? item.ip}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(item.info || []).map((row, i) => (
            <TableRow key={i} className="bg-white odd:bg-gray-100">
              <TableCell width={140}>{row[0]}</TableCell>
              <TableCell className="!font-medium">{row[1] ?? '_'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IpItem;
