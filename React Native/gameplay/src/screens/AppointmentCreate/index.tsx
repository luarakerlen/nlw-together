import React from "react";
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";
import { useState } from "react";
import { RectButton } from "react-native-gesture-handler";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../../components/Guilds";
import { GuildProps } from "../../components/Guild";

export function AppointmentCreate() {
	const [category, setCategory] = useState("");
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	function handleCategorySelect(categoryId: string) {
		setCategory(categoryId);
	}

	function handleOpenGuilds() {
		setOpenGuildsModal(true);
	}

	function handleCloseGuilds() {
		setOpenGuildsModal(false);
	}

	function handleGuildSelect(guildSelected: GuildProps) {
		setGuild(guildSelected);
		setOpenGuildsModal(false);
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Background>
				<ScrollView>
					<Header title="Agendar partida" />

					<Text
						style={[
							styles.label,
							{ marginLeft: 24, marginTop: 36, marginBottom: 18 },
						]}
					>
						Categoria
					</Text>

					<CategorySelect
						categorySelected={category}
						setCategory={handleCategorySelect}
						hasCheckBox
					/>

					<View style={styles.form}>
						<RectButton onPress={handleOpenGuilds}>
							<View style={styles.select}>
								{guild.name ? <GuildIcon /> : <View style={styles.image} />}

								<View style={styles.selectBody}>
									<Text style={styles.label}>
										{guild.name ? guild.name : "Selecione um servidor"}
									</Text>
								</View>
								<Feather
									name="chevron-right"
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>

						<View style={styles.field}>
							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Dia e Mês
								</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>

							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Hora e minuto
								</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
						</View>

						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
						</View>
						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
						/>

						<View style={styles.footer}>
							<Button title="Agendar" />
						</View>
					</View>
				</ScrollView>
			</Background>

			<ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
				<Guilds handleGuildSelect={handleGuildSelect} />
			</ModalView>
		</KeyboardAvoidingView>
	);
}
