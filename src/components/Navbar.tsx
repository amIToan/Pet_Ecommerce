import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import WelcomeMessage from "./WelcomeMessage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionSelect: {
      color: "white",
      borderBottom: "1px solid white",
    },
  })
);

const Navbar = () => {
  const [position, setPosition] = useState<string>(
    "Full-stack developers from Viet Nam"
  );
  const [time, setTime] = useState<Date>(new Date(Date.now()));
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date(Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <AppBar>
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={1}
          py={2}
        >
          <Typography variant="h6">React TypeScript</Typography>
          <WelcomeMessage
            position={position}
            country="Viet Nam"
            isLoggin={true}
            username="Toan"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
