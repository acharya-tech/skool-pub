import Box from '@mui/material/Box';
import Card from '@mui/material/Card';


import { ProfileHome } from './components/profile-home';
import { ProfileCover } from './components/profile-cover';
import { useRefineShow } from '@hooks/useShow';
import { APP_USER_URL } from '@app/constant';
import { IUser } from 'src/interfaces';

// ----------------------------------------------------------------------

export function UserProfileView() {
  const { query: userData } = useRefineShow<IUser>({
    resource: APP_USER_URL,
    meta: {
      customQuery: {
        roles: true,
        image: true,
        post: true,
        department: true,
        notes: true,
        staff: true
      }
    }

  });
  const user = userData?.data?.data;
  return (
    <Box>
      <Card sx={{ mb: 3, height: 290 }}>
        <ProfileCover
          roles={user?.roles ?? []}
          name={user?.name ?? ""}
          avatarUrl={user?.image?.url ?? ""}
          coverUrl={""}
        />
      </Card>

      <ProfileHome info={user} />
    </Box>
  );
}
