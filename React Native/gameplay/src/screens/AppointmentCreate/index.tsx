import React from "react";
import {
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COlLECTION_APPOINTMENTS } from "../../configs/database";
import uuid from "react-native-uuid";
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
import { useNavigation } from "@react-navigation/native";

export function AppointmentCreate() {
	const [category, setCategory] = useState("");
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

	const navigation = useNavigation();

	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [hour, setHour] = useState("");
	const [minute, setMinute] = useState("");
	const [description, setDescription] = useState("");

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

	async function handleSave() {
		if(!guild || !category || !day || !month || !hour || !minute) {
			Alert.alert("Preencha todas as informações!")
			return;
		}

		const newAppointment = {
			id: uuid.v4(),
			guild,
			category,
			date: `${day}/${month} às ${hour}:${minute}h`,
			description,
		};

		const storage = await AsyncStorage.getItem(COlLECTION_APPOINTMENTS);
		const appointments = storage ? JSON.parse(storage) : [];

		await AsyncStorage.setItem(
			COlLECTION_APPOINTMENTS,
			JSON.stringify([...appointments, newAppointment])
		);

		navigation.navigate('Home');
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
								{guild.name ? (
									<GuildIcon guildId={guild.id} iconId={guild.icon} />
								) : (
									<View style={styles.image} />
								)}

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
									<SmallInput maxLength={2} onChangeText={setDay} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} onChangeText={setMonth} />
								</View>
							</View>

							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Hora e minuto
								</Text>
								<View style={styles.column}>
									<SmallInput maxLength={2} onChangeText={setHour} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} onChangeText={setMinute} />
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
							onChangeText={setDescription}
						/>

						<View style={styles.footer}>
							<Button title="Agendar" onPress={handleSave} />
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
