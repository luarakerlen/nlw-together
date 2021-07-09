import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Guild, GuildProps } from "../Guild";
import { Load } from "../Load";
import { ListDivider } from "../ListDivider";
import { styles } from "./styles";
import { api } from "../../services/api";
import { useEffect } from "react";

type Props = {
	handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
	const [guilds, setGuilds] = useState<GuildProps[]>([]);
	const [loading, setLoading] = useState(true);

	async function fetchGuilds() {
		const response = await api.get('/users/@me/guilds');
		setGuilds(response.data);
		setLoading(false);
	}

	useEffect(() => {
		fetchGuilds();
	}, [])

	return (
		<View style={styles.container}>
			{loading ? (
				<Load />
			) : (
				<FlatList
					data={guilds}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Guild data={item} onPress={() => handleGuildSelect(item)} />
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <ListDivider isCentered />}
					style={styles.guilds}
					contentContainerStyle={{ paddingBottom: 70, paddingTop: 50 }}
					ListHeaderComponent={() => <ListDivider isCentered />}
				/>
			)}
		</View>
	);
}
