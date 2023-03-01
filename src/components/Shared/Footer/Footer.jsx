import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
	return (
		<Box
			textAlign="center"
			sx={{
				display: "flex",
				justifyContent: "center",
				position: "absolute",
				left: 0,
				bottom: 0,
				right: 0,
				marginBottom: 5,
			}}
		>
			<Typography component="h5" variant="caption">
				2023 Rehab Record
			</Typography>
		</Box>
	);
}
