import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	ImageBackground,
	FlatList,
	Alert,
	Platform,
	Share,
} from "react-native";
import * as Linking from "expo-linking";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import BannerImg from "../../assets/banner.png";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useRoute } from "@react-navigation/core";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
	guildSelected: AppointmentProps;
};

type GuildWidget = {
	id: string;
	name: string;
	instant_invite: string;
	members: MemberProps[];
	presence_count: number;
};

export function AppointmentDetails() {
	const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
	const [loading, setLoading] = useState(true);

	const route = useRoute();

	const { guildSelected } = route.params as Params;

	async function fetchGuildWidget() {
		try {
			const response = await api.get(
				`/guilds/${guildSelected.guild.id}/widget.json`
			);
			setWidget(response.data);
		} catch {
			Alert.alert(
				"Verifique as configurações do servidos. Será que o Widget está habilitado?"
			);
		} finally {
			setLoading(false);
		}
	}

	function handleShareInvitation() {
		const message =
			Platform.OS === "ios"
				? `Junte-se à ${guildSelected.guild.name}`
				: widget.instant_invite;

		Share.share({
			message,
			url: widget.instant_invite,
		});
	}

	function handleOpenGuild() {
		Linking.openURL(widget.instant_invite);
	}

	useEffect(() => {
		fetchGuildWidget();
	}, []);

	return (
		<Background>
			<Header
				title="Detalhes"
				action={
					guildSelected.guild.owner && (
						<BorderlessButton onPress={handleShareInvitation}>
							<Fontisto name="share" size={24} color={theme.colors.primary} />
						</BorderlessButton>
					)
				}
			/>

			<ImageBackground source={BannerImg} style={styles.banner}>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>{guildSelected.guild.name}</Text>
					<Text style={styles.subtitle}>{guildSelected.description}</Text>
				</View>
			</ImageBackground>

			{loading ? (
				<Load />
			) : (
				<>
					<ListHeader
						title="Jogadores"
						subtitle={`Total: ${widget.presence_count}`}
					/>

					<FlatList
						data={widget.members}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <Member data={item} />}
						ItemSeparatorComponent={() => <ListDivider isCentered />}
						style={styles.members}
					/>
				</>
			)}

			{guildSelected.guild.owner && (
				<View style={styles.footer}>
					<ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
				</View>
			)}
		</Background>
	);
}
