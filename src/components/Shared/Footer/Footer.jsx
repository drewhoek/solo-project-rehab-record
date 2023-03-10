import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
	return (
		<Box
			textAlign="center"
			sx={{
				paddingBottom: 2,
			}}
		>
			<Typography component="h5" variant="caption">
				2023 RehabRecord
			</Typography>
			<Typography component="h5" variant="caption">
				All images provided by{" "}
				<Link
					href="https://www.injurymap.com/free-human-anatomy-illustrations"
					variant="caption"
				>
					InjuryMap
				</Link>
			</Typography>
		</Box>
	);
}
