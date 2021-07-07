import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	content: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		color: theme.colors.heading,
		fontSize: 18,
		fontFamily: theme.fonts.title700,
		marginBottom: 11,
	},
	type: {
		color: theme.colors.highlight,
		fontSize: 13,
		fontFamily: theme.fonts.text400,
		marginBottom: 24,
	},
});
