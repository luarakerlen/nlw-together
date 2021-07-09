import React, { useState, useCallback } from "react";
import { FlatList, View } from "react-native";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { styles } from "./styles";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COlLECTION_APPOINTMENTS } from "../../configs/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Load } from "../../components/Load";

export function Home() {
	const [category, setCategory] = useState("");
	const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	function handleCategorySelect(categoryId: string) {
		categoryId === category ? setCategory("") : setCategory(categoryId);
	}

	function handleAppointmentDetails(guildSelected : AppointmentProps) {
		navigation.navigate("AppointmentDetails", {guildSelected});
	}

	function handleAppointmentCreate() {
		navigation.navigate("AppointmentCreate");
	}

	async function loadAppointments() {
		const response = await AsyncStorage.getItem(COlLECTION_APPOINTMENTS);

		const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

		if (category) {
			setAppointments(storage.filter((item) => item.category === category));
		} else {
			setAppointments(storage);
		}
		setLoading(false);
	}

	useFocusEffect(useCallback(() => {
		loadAppointments();
	}, [category]));

	return (
		<Background>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd onPress={handleAppointmentCreate} />
			</View>

			<CategorySelect
				categorySelected={category}
				setCategory={handleCategorySelect}
				hasCheckBox={false}
			/>

			{loading ? (
				<Load />
			) : (
				<>
					<ListHeader title="Partidas agendadas" subtitle={`Total: ${appointments.length}`} />

					<FlatList
						data={appointments}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
						)}
						ItemSeparatorComponent={() => <ListDivider />}
						style={styles.matches}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 70 }}
					/>
				</>
			)}
		</Background>
	);
}
