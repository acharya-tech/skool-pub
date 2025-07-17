import { Autocomplete, Button, Checkbox, Chip, FormControl, FormControlLabel, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Popper, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { getError, getLabel } from "./functions";
import { DateRangePicker, } from 'react-date-range';
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import React, { useEffect, useState } from "react";
import { BasicModal } from "../modal/basic.modal";
import dayjs from "dayjs";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useTranslate } from "@hooks/useTranslate";
import { LANG_COMMON } from "@common/constant";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDebouncedCallback } from "use-debounce";
import SearchIcon from '@mui/icons-material/Search';

type UCSInputSizeProps = "small" | "medium"
interface IUCSInput {
    inputProps?: any
    inputRef?: any
    mini?: boolean
    disabled?: boolean
    multiline?: number
    required?: boolean
    type?: string
    fullWidth?: boolean
    onChange: any
    value: any
    defaultValue?: any
    touched?: any
    placeholder?: any
    variant?: any
    rules?: any
    size?: UCSInputSizeProps
    label: string
    error?: any
    id?: string
    min?: number
    max?: number
    sx?: any
    width?: number
    textAlign?: "left" | "center" | "right";
}

interface IUCSLabel {
    required?: boolean
    disabled?: boolean
    fullWidth?: boolean
    defaultValue?: any
    placeholder?: any
    variant?: any
    size?: UCSInputSizeProps
    label: string
    id?: string
}

interface IUCSHiddenInput {
    control: any
    defaultValue?: any
    name: string
}

interface IUCSSelect extends IUCSInput {
    children?: any
}

interface IUCSCheckBox extends IUCSInput {
    children?: any
    checkedValue?: any
}

interface IUCSNumber extends IUCSInput {
    min?: number
    max?: number
    step?: number
}

interface IUCSDatePicker extends IUCSInput {
    format?: string
}

interface IUCSDateRangePicker extends Omit<IUCSInput, "defaultValue" | "value"> {
    format?: string
    fromValue?: Date
    toValue?: Date
    saperator?: string
}

interface IUCSTime extends IUCSInput {
    format?: string
    ampm?: boolean
}

interface IUCSAutoComplete extends IUCSInput {
    containerRef?: any
    autocompleteProps?: any
    getOptionLabel?: any
    isOptionEqualToValue?: any
    multiple?: boolean
    groupBy?: any
    renderLabel?: any
    filterOptions?: any
    getOptionDisabled?: any
}

interface IUCSSoloComplete extends IUCSInput {
    autocompleteProps?: any
    getOptionLabel?: any
    renderLabel?: any
    onInputChange?: any
}

interface IUCSSearch {
    value?: string
    placeholder?: string
    onChange: (value: string) => void
}

export const UCSInput = (props: IUCSInput) => {
    const { value, disabled, inputRef, mini, min, inputProps, max, textAlign = "left", multiline, type, size, onChange, fullWidth, required, variant, id, placeholder, label, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <TextField
                multiline={Boolean(multiline)}
                rows={multiline}
                value={value}
                type={type ?? "text"}
                onChange={onChange}
                disabled={disabled}
                InputLabelProps={{
                    shrink: !!value,
                    sx: {
                        ...(mini ? { padding: "10px 0px", lineHeight: 0 } : {})
                    }
                }}
                variant={variant ?? "outlined"}
                id={id ?? `${label}-id`}
                label={getLabel(label, required)}
                size={size ?? "small"}
                placeholder={placeholder}
                inputRef={inputRef}
                sx={{
                    backgroundColor: "#fff",
                }}
                InputProps={{
                    inputProps: {
                        maxLength: max,
                        minLength: min,
                        sx: {
                            textAlign: textAlign,
                            ...(mini ? { padding: "4px 10px" } : {})
                        },
                        ...inputProps
                    }
                }}
            />
        </FormControl >
    </Box>
}


export const UCSDateRangePicker = (props: IUCSDateRangePicker) => {
    const t = useTranslate(LANG_COMMON)
    const [isOpen, setOpen] = useState(false);
    const { error, fullWidth, width, size, id, placeholder, sx, fromValue, toValue, disabled, variant, required, format, label, onChange } = props;
    const getStartOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
    const getEndOfDay = (date: Date) => new Date(date.setHours(23, 59, 59, 999));

    const [dateRange, setDateRange] = useState({
        startDate: getStartOfDay(fromValue ?? new Date(new Date().setDate(new Date().getDate() - 6))),
        endDate: getEndOfDay(toValue ?? new Date())
    });
    return <Box>
        <FormControl className="test" fullWidth={fullWidth} size={size ?? "small"}>
            <TextField
                type={"text"}
                InputLabelProps={{
                    shrink: !!fromValue
                }}
                fullWidth
                variant={variant ?? "outlined"}
                id={id ?? `${name}-id`}
                disabled={disabled}
                label={getLabel(label, required)}
                size={size ?? "small"}
                value={fromValue ? `${dayjs(fromValue).format(format ?? "YYYY-MM-DD")} ${props.saperator ?? " To "} ${dayjs(toValue).format(format ?? "YYYY-MM-DD")}` : ""}
                placeholder={placeholder}
                sx={sx}
                onClick={() => {
                    setOpen(true)
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <CalendarIcon />
                        </InputAdornment>
                    ),
                }}
            />
            {getError(error)}
        </FormControl>
        <BasicModal
            onClose={() => setOpen(false)}
            open={isOpen}
            title={label}
            size="lg"
            footer={<>
                <Box justifyContent={"flex-end"}>
                    <Button onClick={() => {
                        const start = getStartOfDay(new Date(dateRange.startDate));
                        const end = getEndOfDay(new Date(dateRange.endDate));
                        onChange(start, end);
                        setOpen(false)
                    }}>{t("@actions.save")}</Button>
                    <Button color="error" onClick={() => setOpen(false)}>{t("@actions.cancel")}</Button>
                </Box>
            </>}
        >
            <DateRangePicker
                onChange={(item: any) => {
                    setDateRange({
                        startDate: getStartOfDay(new Date(item.selection.startDate)),
                        endDate: getEndOfDay(new Date(item.selection.endDate)),
                    });
                }}
                moveRangeOnFirstSelection={false}
                weekStartsOn={0}
                showMonthAndYearPickers
                months={2}
                dateDisplayFormat={("yyyy-MM-dd")}
                ranges={[
                    {
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        key: 'selection'
                    }]}
                direction="horizontal"
            />
        </BasicModal>
    </Box>
}


export function UCSDatePicker(props: IUCSDatePicker) {
    const { label, onChange, defaultValue, width = 200, format, value, disabled, size, fullWidth } = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ paddingTop: 1, marginTop: -1, minWidth: width }}>
                <DatePicker
                    value={value ? dayjs(value) : null}
                    defaultValue={dayjs(defaultValue)}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange(e?.toISOString() ?? '')
                    }}
                    label={label}
                    sx={{ minWidth: width }}
                    format={format ?? "YYYY-MM-DD"}
                    slotProps={{
                        textField: {
                            sx: { minWidth: width },
                            size: size || 'small',
                            fullWidth: fullWidth || false
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}


export function UCSSelect(props: IUCSSelect) {
    const {
        label,
        onChange,
        value,
        disabled,
        size = "small",
        fullWidth = false,
        children,
        width = 200
    } = props;

    return (
        <FormControl fullWidth={fullWidth} sx={{ minWidth: width }} size={size} disabled={disabled} variant="outlined">
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                fullWidth={fullWidth}
                labelId={`${label}-label`}
                id={`${label}-id`}
                value={value}
                label={label}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </Select>
        </FormControl>
    );
}

export const UCSAutoComplete = (props: IUCSAutoComplete) => {
    const { containerRef, disabled, getOptionDisabled, renderLabel, multiple, groupBy, isOptionEqualToValue, autocompleteProps, getOptionLabel, filterOptions, size, value, onChange, fullWidth, required, variant, id, placeholder, label, width } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"} sx={{ minWidth: width }}>
            <Autocomplete
                {...autocompleteProps}
                {...containerRef && {
                    PopperComponent: (props) => (
                        <Popper {...props} container={containerRef.current} />
                    )
                }}
                multiple={multiple}
                getOptionDisabled={getOptionDisabled}
                onChange={(event, newValue: any) => {
                    onChange(newValue);
                }}
                filterOptions={filterOptions}
                groupBy={groupBy}
                value={value || (multiple ? [] : null)}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={isOptionEqualToValue ?? ((option: any, value: any) => { return option.id === value.id })}
                placeholder={placeholder}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {renderLabel?.(option) ?? option.name}
                    </li>
                )}
                disabled={disabled}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        disabled={disabled}
                        label={getLabel(label, required)}
                        size={size ?? "small"}
                        variant={variant ?? "outlined"}
                    />
                )}
            />
        </FormControl >
    </Box>
}

export const UCSCheckbox = (props: IUCSCheckBox) => {
    const {
        error,
        disabled,
        size,
        fullWidth,
        required,
        children,
        variant,
        id,
        placeholder,
        label,
        rules,
        value,
        onChange,
        checkedValue
    } = props;

    return (
        <Box pt={0.5}>
            <FormControl fullWidth={fullWidth} size={size ?? "small"}>
                <FormControlLabel
                    id={id}
                    control={
                        <Checkbox
                            disabled={disabled}
                            value={value}
                            checked={value === checkedValue}
                            onChange={onChange}
                        />
                    }
                    label={getLabel(label, required)}
                />
            </FormControl>
        </Box>
    );
};

export function UCSMultiSelect(props: IUCSSelect) {
    const {
        label,
        onChange,
        value,
        disabled,
        size = "small",
        fullWidth = false,
        children,
        width = 200
    } = props;
    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        onChange(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <FormControl fullWidth={fullWidth} sx={{ minWidth: width }} size={size} disabled={disabled} variant="outlined">
            <InputLabel id={`${label}-label`}>{label}</InputLabel>
            <Select
                fullWidth={fullWidth}
                labelId={`${label}-label`}
                id={`${label}-id`}
                value={value}
                label={label}
                multiple
                onChange={handleChange}
                disabled={disabled}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected: any) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {children}
            </Select>
        </FormControl>
    );
}

interface IUCSSearch {
    fullWidth?: boolean
    value?: string
    placeholder?: string
    onChange: (value: string) => void
}

export const UCSSearch = (props: IUCSSearch) => {
    const { onChange, value, placeholder, fullWidth } = props
    const [search, setSearch] = React.useState<string>(value ?? "")
    const handleSearch = useDebouncedCallback((search: string) => {
        props.onChange(search)
    }, 300);
    useEffect(() => {
        handleSearch(search)
    }, [search])
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onChange(search)
            }}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', outline: "1px solid #eee", borderRadius: 5 }}
            >
                <InputBase
                    name="search"
                    type="search"
                    fullWidth={fullWidth}
                    sx={{ ml: 2, flex: 1 }}
                    value={search}
                    size="small"
                    placeholder={placeholder}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="submit" sx={{ p: '7px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </form>
    );
}