import AppCard from "@/components/app-card";
import { theme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const COURSES = [
	{ id: "cprg216", title: "CPRG-216", subtitle: "Object Oriented Programming" },
	{ id: "cprg303", title: "CPRG-303", subtitle: "Mobile Development" },
	{ id: "cprg306", title: "CPRG-306", subtitle: "Advanced Web Development" },
];

const CourseList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Your Courses</Text>
			<FlatList
				data={COURSES}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Pressable
						onPress={() =>
							router.push({
								pathname: "/(tabs)/courses/[id]",
								params: { id: item.id },
							})
						}
					>
						<AppCard
							title={item.title}
							subtitle={item.subtitle}
							right={
								<Ionicons
									name="chevron-forward"
									size={20}
									color={theme.colors.mute}
								/>
							}
						/>
					</Pressable>
				)}
			/>
		</View>
	);
};

export default CourseList;

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
