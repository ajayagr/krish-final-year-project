import { Avatar, Stack, Typography, styled } from "@mui/material";
import { TContact } from "../../../../constants/project";

const StyledAvatar = styled(Avatar)({
  width: "32px",
  height: "32px",
});

const Contact = ({ imageUrl, name, phoneNumber }: TContact) => {
  return (
    <Stack direction="row" role="listitem">
      <StyledAvatar src={imageUrl}></StyledAvatar>
      <Stack ml={1}>
        <Typography variant="caption">{name}</Typography>
        <Typography variant="caption" color="customGrey.main">
          {phoneNumber}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Contact;
