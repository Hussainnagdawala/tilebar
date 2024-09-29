import { colors } from "../../theme";
import { Typography, Box, Link } from "@mui/material";
import { styles } from "./styles";

export const LoginFooter = () => {
  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.footerLinksContainer}>
        <Typography component={"span"} sx={styles.footerLink}>
          <Link href="#" style={{ color: colors.appBarBackground.main }}>
            Terms & Condition
          </Link>
        </Typography>
        <Typography component={"span"} sx={styles.footerSeparator}>
          |
        </Typography>
        <Typography component={"span"} sx={styles.footerLink}>
          <Link href="#" style={{ color: colors.appBarBackground.main }}>
            Privacy & Policy
          </Link>
        </Typography>
      </Box>
      <Box sx={styles.footerRightsContainer}>
        <Typography component={"span"} sx={styles.footerRights}>
          2024 Provide Digital Ltd. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};
