import { IconButton, Paper, Stack, Typography } from "@mui/material"
import { FaRegSave } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_ACADEMIC } from "@common/constant";
import { UCSAutoComplete } from "@components/input/uc.input";
import { useAutocomplete } from "@refinedev/mui";
import { IClass, ISession, ITimetableCreate } from "@academic/interface";
import React from "react";
import { ACADEMIC_CLASS_URL, ACADEMIC_SESSION_URL } from "@academic/constant/server.url";
import { FullScreenButton } from "src/components/settings/drawer/fullscreen-button";
import { FaRegClone } from "react-icons/fa6";

type HeaderMenuProps = {
  containerRef: any
  classes: IClass[]
  setOpenClone: (open: boolean) => void
  setClasses: React.Dispatch<React.SetStateAction<IClass[]>>
  session: ISession | null
  setSession: React.Dispatch<React.SetStateAction<ISession | null>>
  canSave: boolean
  onSave: (value: any) => void
  onClose: () => void
}
export const HeaderMenu = ({ setOpenClone, containerRef, onSave, onClose, canSave, setClasses, classes, session, setSession }: HeaderMenuProps) => {
  const t = useTranslate(LANG_ACADEMIC, "timeline")

  const { autocompleteProps: classAutoProps } = useAutocomplete<IClass>({
    resource: ACADEMIC_CLASS_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });

  const { autocompleteProps: sessionAutoProps } = useAutocomplete<ISession>({
    resource: ACADEMIC_SESSION_URL,
    onSearch: (value: string) => {
      return [
        {
          field: "name",
          operator: "eq",
          value
        }
      ]
    }
  });
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 0,
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 10,
        py: 1.5,
        backgroundColor: 'white',
        width: '100%'
      }}>
      <Stack direction={'row'} spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={onClose}><IoMdArrowBack /></IconButton>
          <Typography width={150} sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{t("titles.list")}</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <FullScreenButton containerRef={containerRef} />
          <IconButton disabled={!session || !classes.length} size="medium" onClick={() => setOpenClone(true)}><FaRegClone fontSize={18} /></IconButton>
          <IconButton disabled={!canSave} size="medium" onClick={onSave} color="success"><FaRegSave fontSize={18} /></IconButton>
          <UCSAutoComplete
            containerRef={containerRef}
            key={"session"}
            value={session}
            width={200}
            autocompleteProps={sessionAutoProps}
            label={t("fields.session")}
            getOptionLabel={(session: ISession) => session.name}
            onChange={(session: ISession) => {
              setSession(session)
            }}
          />
          <UCSAutoComplete
            containerRef={containerRef}
            key={"aclass"}
            value={classes}
            multiple
            width={340}
            autocompleteProps={classAutoProps}
            label={t("fields.class")}
            getOptionLabel={(aclass: IClass) => aclass.name}
            onChange={(aclas: IClass[]) => {
              setClasses(aclas)
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}