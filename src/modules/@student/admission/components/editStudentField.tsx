import { Box, MenuItem, TextField, Tooltip } from "@mui/material";
import { StudentColumnAttributes } from "@student/interface/types";
import { validateStudentCell } from "@student/utils";
import { useEffect, useState } from "react";

type EditImportStudentFieldProps = {
    api: any;
    id: any;
    field: any;
    value?: any;
    row: any;
    config: StudentColumnAttributes;
}
        export const EditImportStudentField=(params: EditImportStudentFieldProps) => {
        
        const { api, id, field, config } = params;
        const error=validateStudentCell(field, params.value, params.row)
        const handleChange = (e: any) => {
          api.setEditCellValue({ id, field, value: e.target.value });
        };
        const [showTooltip, setShowTooltip] = useState(false);
        useEffect(() => {
            setShowTooltip(!!error)
        }, [error])
        return (
          <Box width="100%" m={1}>
            <Tooltip color="error" title={error} open={showTooltip} placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "error.main",
                  color: "common.white",
                  fontSize: 13,
                  fontWeight: 500,
                },
              },
              arrow: {
                sx: {
                  color: "error.main",
                },
              },
              }}
            >
      {config.type === "select" ? (
        <TextField
          select
          fullWidth
          variant="standard"
          value={params.value ?? ""}
          onChange={handleChange}
          onFocus={() => setShowTooltip(!!error)}
          onBlur={() => setShowTooltip(false)}
          size="small"
          error={!!error}
        >
          {(config.options || []).map((opt:string) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          fullWidth
          type={config.type}
          value={params.value ?? ""}
          onChange={handleChange}
          onFocus={() => setShowTooltip(!!error)}
          onBlur={() => setShowTooltip(false)}
          variant="standard"
          size="small"
          error={!!error}
        />
        
      )}
      </Tooltip>
    </Box>)
        }