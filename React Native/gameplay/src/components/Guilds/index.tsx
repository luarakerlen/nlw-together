import React from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../Guild";
import { ListDivider } from "../ListDivider";
import { styles } from "./styles";

type Props = {
	handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
	const guilds = [
		{
			id: "1",
			name: "Lendários",
			icon: null,
			owner: true,
		},
		{
			id: "2",
			name: "Galera do trabalho",
			icon: null,
			owner: false,
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={guilds}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Guild data={item} onPress={() => handleGuildSelect(item)} />
				)}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <ListDivider />}
				style={styles.guilds}
			/>
		</View>
	);
}
