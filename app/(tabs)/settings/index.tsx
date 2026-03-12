import AppCard from "@/components/app-card";
import * as storage from "@/lib/storage";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Switch,
	Text,
	View,
} from "react-native";

const Settings = () => {
	const [notification, setNotification] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	// Load saved notification preference on mount
	useEffect(() => {
		// Define a async function to load the value since useEffect can't be async
		const loadNotification = async () => {
			// Try to load saved value from storage if it exists
			const saved = await storage.get<boolean>(
				storage.STORAGE_KEY.NOTIFICATIONS,
			);
			if (saved !== null) {
				// if we have a saved value, use it to set the state
				setNotification(saved);
			}
			const savedDarkMode = await storage.get<boolean>(
				storage.STORAGE_KEY.THEME,
			);
			if (savedDarkMode !== null) {
				setDarkMode(savedDarkMode);
			};
			setIsLoading(false); // turning off the spinner
		};
		loadNotification();
	}, []);

	const handleToggle = async (value: boolean) => {
		setNotification(value);
		await storage.set(storage.STORAGE_KEY.NOTIFICATIONS, value);
	};

	const handleDarkModeToggle = async (value: boolean) => {
		setDarkMode(value);
		await storage.set(storage.STORAGE_KEY.THEME, value);
	}

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Settings</Text>

			<AppCard
				title="Notifications"
				subtitle="Enable app notifications"
				right={<Switch value={notification} onValueChange={handleToggle} />}
			/>

			<AppCard
				title="Dark Mode"
				subtitle="Enable dark mode"
				right={<Switch value={darkMode} onValueChange={handleDarkModeToggle} />}
			/>

			<Pressable onPress={() => router.push("/(tabs)/settings/profile")}>
				<AppCard
					title="Account"
					subtitle="Update profile settings"
					right={
						<Ionicons
							name="chevron-forward"
							size={24}
							color={theme.colors.primary}
						/>
					}
				/>
			</Pressable>
		</View>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: theme.spacing.screen,
		backgroundColor: theme.colors.bg,
	},
	h1: {
		fontSize: 22,
		fontWeight: "800",
		marginBottom: 12,
		color: theme.colors.text,
	},
});
