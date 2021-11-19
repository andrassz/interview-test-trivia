import Styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

/* eslint-disable-next-line */
export interface UserFormProps {
}

const StyledUserForm = Styled.div`
  max-width: 60%;
  margin: 64px auto 0;
  padding: 48px;
  border: solid 1px lightgray;
`;

export function UserForm(props: UserFormProps) {
  return (
    <StyledUserForm>
      <Stack spacing={2}>
        <h1>Enter your name</h1>
        <TextField id="username" label="Username" variant="outlined" />
        <Button variant="contained">Enter game</Button>
      </Stack>
    </StyledUserForm>
  );
}

export default UserForm;
