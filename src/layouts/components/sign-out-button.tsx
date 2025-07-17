import type { ButtonProps } from "@mui/material/Button";

import Button from "@mui/material/Button";

import { useRouter } from "src/routes/hooks";

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  onClose?: () => void;
};

export function SignOutButton({ onClose, sx, ...other }: Props) {
  const router = useRouter();

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      sx={sx}
      {...other}
    >
      Logout
    </Button>
  );
}
