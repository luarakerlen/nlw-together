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
		{
			id: "3",
			name: "Lendários",
			icon: null,
			owner: true,
		},
		{
			id: "4",
			name: "Lendários",
			icon: null,
			owner: true,
		},
		{
			id: "5",
			name: "Lendários",
			icon: null,
			owner: true,
		},
		{
			id: "6",
			name: "Lendários",
			icon: null,
			owner: true,
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
				ItemSeparatorComponent={() => <ListDivider isCentered />}
				style={styles.guilds}
				contentContainerStyle={{paddingBottom: 70, paddingTop: 50}}
				ListHeaderComponent={() => <ListDivider isCentered />}
			/>
		</View>
	);
}
