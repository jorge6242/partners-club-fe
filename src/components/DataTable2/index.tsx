import React, { FunctionComponent, createElement } from "react";
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
    data: any;
    columns: any;
    isDelete?: boolean;
    handleEdit?: any;
    handleDelete?: any;
    loading?: boolean;
}

const DataTable2: FunctionComponent<DataTableProps> = ({
    data,
    columns,
    isDelete = true,
    handleEdit,
    handleDelete,
    loading
}) => {
    const classes = useStyles();

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
                                data.map((row: any, ) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column: any) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === "number"
                                                            ? column.format(value)
                                                            : createElement(column.component, { value })}
                                                    </TableCell>
                                                );
                                            })}
                                            {
                                                handleEdit && (
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleEdit(row.id)}
                                                        >
                                                            Edit
                          </Button>
                                                    </TableCell>
                                                )
                                            }
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
        </Paper>
    );
};

export default DataTable2;
