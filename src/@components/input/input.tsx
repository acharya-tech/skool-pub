import { Autocomplete, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, Rating, Select, Switch, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { MuiColorInput } from 'mui-color-input'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { RadioGroup } from "@mui/material";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { getError, getLabel } from "./functions";
import { InputAdornment } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import { YesNoEnum } from "@common/all.enum";
import { Iconify } from "src/components/iconify";
import { useBoolean } from "minimal-shared/hooks";
const soloFilter = createFilterOptions()

type CSInputSizeProps = "small" | "medium"
interface ICSInput {
    inputRef?: any
    disabled?: boolean
    multiline?: number
    required?: boolean
    type?: string
    fullWidth?: boolean
    control: any
    onChange?: any
    defaultValue?: any
    touched?: any
    placeholder?: any
    variant?: any
    rules?: any
    name: string
    size?: CSInputSizeProps
    label?: string
    errors?: any
    error?: any
    id?: string
    min?: number
    max?: number
    textAlign?: "left" | "center" | "right";
    mini?: boolean
}

interface ICSLabel {
    required?: boolean
    disabled?: boolean
    fullWidth?: boolean
    defaultValue?: any
    placeholder?: any
    variant?: any
    size?: CSInputSizeProps
    label: string
    id?: string
}

interface ICSHiddenInput {
    control: any
    defaultValue?: any
    name: string
    label?: string
    required?: boolean
    rules?: any
}

interface ICSSelect extends ICSInput {
    children?: any
}

interface ICSCheckBox extends ICSInput {
    children?: any
    defaultValue?: any
    items?: string[]
}

interface ICSNumber extends ICSInput {
    min?: number
    max?: number
    step?: number
}

interface ICSDatePicker extends ICSInput {
    format?: string
}

interface ICSDateRangePicker extends Omit<ICSInput, "defaultValue"> {
    format?: string
    fromValue?: any
    toValue?: any
    fromLabel?: string
    toLabel?: string
}

interface ICSTime extends ICSInput {
    format?: string
    ampm?: boolean
}

interface ICSAutoComplete extends ICSInput {
    autocompleteProps?: any
    getOptionLabel?: any
    isOptionEqualToValue?: any
    multiple?: boolean
    groupBy?: any
    renderLabel?: any
    filterOptions?: any
    getOptionDisabled?: any
}

interface ICSSoloComplete extends ICSInput {
    autocompleteProps?: any
    getOptionLabel?: any
    renderLabel?: any
    onInputChange?: any
}

interface ICSSearch {
    value?: string
    placeholder?: string
    onChange: (value: string) => void
}



export const CSSearch = (props: ICSSearch) => {
    const { onChange, value, placeholder } = props
    const [search, setSearch] = React.useState<string>(value ?? "")
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onChange(search)
            }}
        >
            <Box
                sx={{ display: 'flex', alignItems: 'center', outline: "1px solid #eee", borderRadius: 5, width: 250 }}
            >
                <InputBase
                    name="search"
                    type="search"
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

export const CSHiddenInput = (props: ICSHiddenInput) => {
    const { name, control, defaultValue, label, rules, required } = props;
    return <Controller
        control={control}
        name={name}
        rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
        defaultValue={defaultValue}
        render={({ field }) => {
            return (<input
                {...field}
                type={"hidden"}
                value={defaultValue}
                id={`${name}-id`}
            />
            )
        }}
    />
}

export const CSLabel = (props: ICSLabel) => {
    const { size, fullWidth, required, variant, id, label, defaultValue } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <TextField
                disabled={true}
                InputLabelProps={{
                    shrink: true
                }}
                sx={{
                    backgroundColor: "#fff",
                }}
                value={defaultValue}
                variant={variant ?? "outlined"}
                id={id}
                label={getLabel(label, required)}
                size={size ?? "small"}
            />
        </FormControl >
    </Box>
}

export const CSInput = (props: ICSInput) => {
    const { control, error, disabled, inputRef, mini, min, max, textAlign = "left", multiline, type, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label ?? placeholder} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <TextField
                            {...field}
                            multiline={Boolean(multiline)}
                            rows={multiline}
                            type={type ?? "text"}
                            onChange={(e) => {
                                onChange ? onChange(e, field) : field.onChange(e);
                            }}
                            disabled={disabled}
                            InputLabelProps={{
                                shrink: !!field.value,
                                sx: {
                                    ...(mini ? { padding: "10px 0px", lineHeight: 0 } : {})
                                }
                            }}
                            variant={variant ?? "outlined"}
                            id={id ?? `${name}-id`}
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
                                    }
                                }
                            }}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSPassword = (props: ICSInput) => {
    const showPassword = useBoolean();
    const { control, error, disabled, inputRef, mini, min, max, textAlign = "left", multiline, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label ?? placeholder} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <TextField
                            {...field}
                            multiline={Boolean(multiline)}
                            rows={multiline}
                            type={showPassword.value ? "text" : "password"}
                            onChange={(e) => {
                                onChange ? onChange(e, field) : field.onChange(e);
                            }}
                            disabled={disabled}
                            variant={variant ?? "outlined"}
                            id={id ?? `${name}-id`}
                            label={getLabel(label, required)}
                            size={size ?? "small"}
                            placeholder={placeholder}
                            inputRef={inputRef}
                            sx={{
                                backgroundColor: "#fff",
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                    sx: {
                                        ...(mini ? { padding: "10px 0px", lineHeight: 0 } : {})
                                    },
                                },
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={showPassword.onToggle} edge="end">
                                                <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            InputProps={{
                                inputProps: {
                                    maxLength: max,
                                    minLength: min,
                                    sx: {
                                        textAlign: textAlign,
                                        ...(mini ? { padding: "4px 10px" } : {})
                                    }
                                }
                            }}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}
export const CSRating = (props: ICSInput) => {
    const { control, error, disabled, type, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <Rating
                            {...field}
                            onChange={onChange ?? field.onChange}
                            disabled={disabled}
                            size={size ?? "small"}
                            id={id ?? `${name}-id`}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}


export const CSSoloComplete = (props: ICSSoloComplete) => {
    const { control, disabled, onInputChange, error, renderLabel, autocompleteProps, getOptionLabel, type, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            freeSolo
                            onChange={(event, newValue: any) => {
                                onChange ? onChange(newValue, field) : field.onChange(newValue); // Pass the whole object to the form
                            }}
                            value={field.value}
                            onInputChange={onInputChange}
                            getOptionLabel={getOptionLabel}
                            placeholder={placeholder}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.inputValue ? option.title : (renderLabel?.(option) ?? option.name)}
                                </li>
                            )}
                            filterOptions={(options, params) => {
                                const filtered = soloFilter(options, params);
                                if (params.inputValue !== '') {
                                    filtered.push({
                                        inputValue: params.inputValue,
                                        title: `Add "${params.inputValue}"`,
                                    });
                                }
                                return filtered;
                            }}
                            disabled={disabled}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // InputLabelProps={{
                                    //     shrink: !!field.value
                                    // }}
                                    disabled={disabled}
                                    label={getLabel(label, required)}
                                    size={size ?? "small"}
                                    variant={variant ?? "outlined"}

                                />
                            )}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSAutoComplete = (props: ICSAutoComplete) => {
    const { control, disabled, error, getOptionDisabled, renderLabel, multiple, groupBy, isOptionEqualToValue, autocompleteProps, getOptionLabel, filterOptions, type, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            multiple={multiple}
                            getOptionDisabled={getOptionDisabled}
                            onChange={(event, newValue: any) => {
                                onChange ? onChange(newValue, field) : field.onChange(newValue); // Trigger any additional onChange handlers
                            }}
                            filterOptions={filterOptions}
                            groupBy={groupBy}
                            value={field.value || (multiple ? [] : null)}
                            getOptionLabel={getOptionLabel}
                            isOptionEqualToValue={isOptionEqualToValue ?? ((option: any, value: any) => { return option.id === value.id })}
                            placeholder={placeholder}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {renderLabel?.(option) ?? option.name}
                                </li>
                            )}
                            sx={{
                                backgroundColor: "#fff",
                            }}
                            disabled={disabled}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    InputLabelProps={{
                                        shrink: !!field.value
                                    }}
                                    disabled={disabled}
                                    label={getLabel(label, required)}
                                    size={size ?? "small"}
                                    variant={variant ?? "outlined"}
                                />
                            )}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSMultiSelect = (props: ICSSelect) => {
    const { control, children, error, disabled, type, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <>
                            <InputLabel id={`multi-label-id-${name}`}>{label}</InputLabel>
                            <Select
                                {...field}
                                disabled={disabled}
                                labelId={`multi-label-id-${name}`}
                                multiple
                                variant={variant ?? "outlined"}
                                id={id ?? `${name}-id`}
                                label={getLabel(label, required)}
                                // placeholder={placeholder}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value: any) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {children}
                            </Select>
                        </>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSColor = (props: ICSInput) => {
    const { error, control, disabled, size, errors, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <MuiColorInput
                            {...field}
                            onChange={onChange ?? field.onChange}
                            disabled={disabled}
                            // InputLabelProps={{
                            //     shrink: !!field.value
                            // }}
                            variant={variant ?? "outlined"}
                            id={id ?? `${name}-id`}
                            label={getLabel(label, required)}
                            size={size ?? "small"}
                            placeholder={placeholder}
                            format="hex"
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSNumber = (props: ICSNumber) => {
    const { control, disabled, mini, textAlign = "right", type, error, errors, size, min, max, step, onChange, fullWidth, required, variant, id, placeholder, label, name, defaultValue, rules } = props;
    let custRule = {}
    if (required) {
        custRule = { ...rules, ...(required ? { required: `${label ?? placeholder} is required` } : {}) }
    }
    if (min) {
        custRule = { ...custRule, ...(min ? { min: { value: min, message: `The minimum value is ${min}` } } : {}) }
    }
    if (max) {
        custRule = { ...custRule, ...(max ? { max: { value: max, message: `The maximum value is ${max}` } } : {}) }
    }
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...custRule }}
                render={({ field }) => {
                    return (
                        <TextField
                            {...field}
                            type={'number'}
                            onChange={onChange ?? field.onChange}
                            disabled={disabled}
                            InputLabelProps={{
                                shrink: (field.value !== undefined || field.value !== null || field.value !== ''),
                                sx: {
                                    ...(mini ? { padding: "10px 0px", lineHeight: 0 } : {})
                                }
                            }}
                            variant={variant ?? "outlined"}
                            id={id ?? `${name}-id`}
                            label={getLabel(label, required)}
                            size={size ?? "small"}
                            placeholder={placeholder}
                            InputProps={{
                                inputProps: {
                                    sx: {
                                        backgroundColor: "background.paper",
                                        textAlign: textAlign,
                                        ...(mini ? { padding: "4px 10px" } : {})
                                    }
                                }
                            }}
                        />
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl >
    </Box>
}

export const CSSelect = (props: ICSSelect) => {
    const { control, errors, error, disabled, mini, size, fullWidth, required, children, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <>
                            <InputLabel
                                id={`label-id-${name}`}
                                sx={{
                                    ...(mini ? { marginTop: "-2px", lineHeight: 0 } : {})
                                }}
                            >{getLabel(label, required)}</InputLabel>
                            <Select
                                {...field}
                                value={field.value !== undefined ? field.value : ''}
                                disabled={disabled}
                                labelId={`label-id-${name}`}
                                variant={variant ?? "outlined"}
                                id={id ?? `${name}-id`}
                                label={getLabel(label, required)}
                                // placeholder={placeholder}
                                inputProps={{
                                    sx: {
                                        ...(mini ? { padding: "4px 10px" } : {})
                                    }
                                }}
                                endAdornment={
                                    (Boolean((field.value ?? defaultValue) && !disabled)) && (
                                        <InputAdornment sx={{ position: "absolute", right: 32 }} position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    field.onChange(undefined);
                                                }}
                                            >
                                                <ClearIcon fontSize="small"></ClearIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            >
                                {children}
                            </Select >
                        </>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    </Box >
}

export const CSRadio = (props: ICSSelect) => {
    const { control, errors, error, disabled, size, fullWidth, required, children, variant, id, placeholder, label, name, defaultValue, rules } = props;
    return <Box pt={0.5}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <>
                            <FormLabel id={id ?? `label-id-${name}`}>{getLabel(label, required)}</FormLabel>
                            <RadioGroup
                                {...field}
                                aria-disabled={disabled}
                                aria-labelledby="radio-group-label">
                                {children}
                            </RadioGroup>
                        </>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    </Box>
}


export function CSSwitch(props: ICSInput) {
    const { id, onChange, control, errors, error, fullWidth, size, disabled, required, label, name, defaultValue, rules } = props;

    return (
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return <FormControlLabel
                        label={label}
                        control={
                            <Switch
                                {...field}
                                checked={field.value}
                                onChange={onChange ?? field.onChange}
                                disabled={disabled}
                                id={id ?? `${name}-id`}
                                size={size ?? "small"}
                            />
                        }
                    />
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    );
}

export const CSCheckboxs = (props: ICSSelect) => {
    const {
        control,
        errors,
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
        name,
        defaultValue = [],
        rules
    } = props;

    return (
        <Box pt={0.5}>
            <FormControl fullWidth={fullWidth} size={size ?? "small"}>
                <FormLabel id={id ?? `label-id-${name}`}>{getLabel(label, required)}</FormLabel>
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    rules={{
                        ...rules,
                        ...(required ? { validate: (value) => value.length > 0 || `${label} is required` } : {}),
                    }}
                    render={({ field }) => {
                        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                            const value = field.value || [];
                            const newValue = event.target.checked
                                ? [...value, event.target.name]
                                : value.filter((item: string) => item !== event.target.name);
                            field.onChange(newValue);
                        };

                        return (
                            <FormGroup>
                                {children.map((child: { label: string; value: string }) => (
                                    <FormControlLabel
                                        key={child.value}
                                        control={
                                            <Checkbox
                                                disabled={disabled}
                                                name={child.value}
                                                checked={field.value?.includes(child.value) || false}
                                                onChange={handleChange}
                                            />
                                        }
                                        label={child.label}
                                    />
                                ))}
                            </FormGroup>
                        );
                    }}
                />
                {getError(error ?? errors?.[name])}
            </FormControl>
        </Box>
    );
};

export const CSCheckboxList = (props: ICSCheckBox) => {
    const {
        control,
        errors,
        error,
        disabled,
        size,
        fullWidth,
        required,
        children,
        variant,
        id,
        placeholder,
        items,
        label,
        name,
        defaultValue = [],
        rules
    } = props;

    return (
        <Box pt={0.5}>
            <FormControl fullWidth={fullWidth} size={size ?? "small"}>
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    rules={{
                        ...rules,
                        ...(required ? { validate: (value) => value.length > 0 || `${label} is required` } : {}),
                    }}
                    render={({ field }) => {
                        const { value, onChange } = field;

                        const handleCheckboxChange = (val: string) => {
                            if (value.includes(val)) {
                                onChange(value.filter((item: string) => item !== val));
                            } else {
                                onChange([...value, val]);
                            }
                        };

                        return (
                            <FormGroup>
                                {items?.map((val: string) => (
                                    <FormControlLabel
                                        key={val}
                                        control={
                                            <Checkbox
                                                checked={value.includes(val)}
                                                onChange={() => handleCheckboxChange(val)}
                                            />
                                        }
                                        label={val}
                                    />
                                ))}
                            </FormGroup>
                        );
                    }}
                />
                {getError(error ?? errors?.[name])}
            </FormControl>
        </Box>
    );
}

export const CSCheckbox = (props: ICSSelect) => {
    const {
        control,
        errors,
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
        name,
        defaultValue = [],
        rules
    } = props;

    return (
        <Box pt={0.5}>
            <FormControl fullWidth={fullWidth} size={size ?? "small"}>
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        ...rules,
                        ...(required ? { validate: (value) => value.length > 0 || `${label} is required` } : {}),
                    }}
                    render={({ field }) => {
                        return (
                            <FormControlLabel
                                id={id}
                                control={
                                    <Checkbox
                                        disabled={disabled}
                                        name={name}
                                        value={defaultValue}
                                        checked={field.value || false}
                                        onChange={field.onChange}
                                    />
                                }
                                label={getLabel(label, required)}
                            />
                        );
                    }}
                />
                {getError(error ?? errors?.[name])}
            </FormControl>
        </Box>
    );
};


export const CSCheckboxYesNo = (props: ICSCheckBox) => {
    const {
        control,
        errors,
        error,
        disabled,
        size,
        fullWidth,
        required,
        defaultValue,
        variant,
        id,
        placeholder,
        label,
        name,
        rules
    } = props;

    return (
        <Box pt={0.5}>
            <FormControl fullWidth={fullWidth} size={size ?? "small"}>
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        ...rules,
                        ...(required ? { validate: (value) => value.length > 0 || `${label} is required` } : {}),
                    }}
                    render={({ field }) => {
                        return (
                            <FormControlLabel
                                id={id}
                                control={
                                    <Checkbox
                                        sx={{ ...(size === "small" ? { py: "5px" } : {}) }}
                                        disabled={disabled}
                                        defaultValue={defaultValue}
                                        name={name}
                                        checked={field.value === YesNoEnum.Yes}
                                        onChange={(e) =>
                                            field.onChange(e.target.checked ? YesNoEnum.Yes : YesNoEnum.No)
                                        }
                                    />
                                }
                                label={getLabel(label, required)}
                            />
                        );
                    }}
                />
                {getError(error ?? errors?.[name])}
            </FormControl>
        </Box>
    );
};

export const CSDatePicker = (props: ICSDatePicker) => {
    const { control, errors, error, mini, fullWidth, size, disabled, required, format, label, name, defaultValue, rules } = props;
    return <Box>
        <FormControl fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{ paddingTop: 0.5, overflow: "hidden" }}>
                                <DatePicker
                                    {...field}
                                    disabled={disabled}
                                    sx={{ width: "100%" }}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(e) => {
                                        field.onChange({
                                            name,
                                            target: {
                                                value: e ? e.toISOString() : ''
                                            }
                                        });
                                    }}
                                    format={format ?? "YYYY-MM-DD"}
                                    label={getLabel(label, required)}
                                    slotProps={{
                                        textField: {
                                            size: size ?? "small", // Use this for smaller input
                                            InputLabelProps: {
                                                sx: {
                                                    ...(mini ? { padding: "-6px 0px", lineHeight: 0 } : {})
                                                }
                                            },
                                            InputProps: {
                                                inputProps: {
                                                    sx: {
                                                        ...(mini ? { padding: "4px 10px", lineHeight: 0 } : {})
                                                    }
                                                }
                                            },
                                            sx: {
                                                minWidth: "auto !important",
                                                width: "100%",
                                            }
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    </Box>
}


export const CSTime = (props: ICSTime) => {

    const { control, errors, error, ampm, fullWidth, size, disabled, required, format, label, name, defaultValue, rules } = props;
    return <Box pt={0}>
        <FormControl fullWidth={fullWidth} size={size ?? "small"} >
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    {...field}
                                    disabled={disabled}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(e) => {
                                        field.onChange({
                                            name,
                                            target: {
                                                value: e ? e.toISOString() : ''
                                            }
                                        });
                                    }}
                                    format={format ?? "hh:mm A"}
                                    ampm={ampm}
                                    label={getLabel(label, required)}
                                    slotProps={{
                                        textField: {
                                            size: size ?? "small", // Use this for smaller input
                                            sx: { minWidth: "auto !important", width: "100%" }
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    </Box>
};

export const CSDateTimePicker = (props: ICSDatePicker) => {
    const { control, errors, error, fullWidth, size, disabled, required, format, label, name, defaultValue, rules } = props;
    return <Box>
        <FormControl className="test" fullWidth={fullWidth} size={size ?? "small"}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ ...rules, ...(required ? { required: `${label} is required` } : {}) }}
                render={({ field }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']} sx={{ paddingTop: 0.5 }}>
                                <DateTimePicker
                                    {...field}
                                    disabled={disabled}
                                    sx={{ width: "100%" }}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(e) => {
                                        field.onChange({
                                            name,
                                            target: {
                                                value: e ? e.toISOString() : ''
                                            }
                                        });
                                    }}
                                    format={format ?? "YYYY-MM-DD hh:mm a"}
                                    label={getLabel(label, required)}
                                    slotProps={{
                                        textField: {
                                            size: size ?? "small", // Use this for smaller input
                                            sx: { minWidth: "auto !important", width: "100%" }
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    );
                }}
            />
            {getError(error ?? errors?.[name])}
        </FormControl>
    </Box>
}


