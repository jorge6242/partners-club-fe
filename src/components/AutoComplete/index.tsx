import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { getAll, remove, search } from "../../actions/bankActions";
import handleDebounce from '../../helpers/handleDebounce';

const useStyles = makeStyles((theme: Theme) => ({
    inputContainer: {
        width: '100%',
    },
}));

interface CountryType {
    name: string;
}

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const dispatch = useDispatch();
    const { loading } = useSelector((state: any) => state.bankReducer);
    const classes = useStyles();

    const onChange = async (event: any) => {
        setOpen(false)
        try {
            const res: any = await dispatch(search(event.value));
            setOptions(res)
            setOpen(true)

        } catch (error) {
            setOpen(false)
        }
    }

    const handleSelect = (option: any, value: any) => {
        if (option.description === value.description) {
            //console.log('value ', value);
        }
        return option.description === value.description;
    }
    const seledtedData =
        {
            id: 1,
            description: "Banco de Venezuela",
            created_at: "2020-02-23 23:48:37",
            updated_at: "2020-02-23 23:48:37",
        };
    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            freeSolo
            onInputChange={handleDebounce(onChange, 1000)}
            getOptionLabel={(option: any) => option.description}
            getOptionSelected={(option: any, value: any) => handleSelect(option, value)}
            options={options}
            loading={loading}
            defaultValue={seledtedData ? seledtedData : null}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Empresa"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="primary" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            disableCloseOnSelect={false}
        />
    );
}