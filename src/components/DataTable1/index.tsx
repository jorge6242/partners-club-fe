import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  progress: {
    display: 'flex',
    justifyContent: 'left',
    padding: 10
  }
});

interface DataTableProps {
  rows: any;
  pagination?: any;
  columns: any;
  isDelete?: boolean;
  handleEdit: Function;
  handleDelete?: any;
  loading?: boolean;
  onChangePage: any;
  onChangePerPage: any;
}

const DataTable1: FunctionComponent<DataTableProps> = ({
  rows = [],
  pagination,
  columns,
  isDelete = true,
  handleEdit,
  handleDelete,
  loading,
  onChangePage,
  onChangePerPage
}) => {
  const classes = useStyles();

  const handlePage = (event: unknown, newPage: number) => {
    const page = pagination.currentPage === 1 ? 2 : newPage;
    onChangePage(page);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePerPage(pagination.currentPage, event.target.value)
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading ? (<TableRow className={classes.progress}><CircularProgress color="primary" /></TableRow>)
                :
                rows.map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(row.id)}
                        >
                          Edit
                      </Button>
                      </TableCell>
                      {isDelete && (
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                        </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          labelRowsPerPage="Filas"
          rowsPerPageOptions={[5 ,10, 20, 30, 40]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.perPage}
          page={pagination.prevPageUrl === null ? 0 : pagination.currentPage}
          onChangePage={handlePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  );
};

export default DataTable1;
