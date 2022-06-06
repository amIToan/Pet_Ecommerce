import { Box } from "@material-ui/core";
interface WelcomeMessageProps {
  username: string;
  position: string;
  country?: string;
  isLoggin: boolean;
}
const WelcomeMessage = ({
  username,
  isLoggin,
  position,
  country = "Vietnam",
}: WelcomeMessageProps) => {
  return (
    <Box mb={1}>
      {isLoggin
        ? `Welcome ${username} - ${position} from ${country}`
        : "Welcome guest"}
    </Box>
  );
};

export default WelcomeMessage;
