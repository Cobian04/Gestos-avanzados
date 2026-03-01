import { Image } from "expo-image";
import React from "react";
import { Alert, StyleSheet } from "react-native";

import { NoteItem } from "@/components/NoteItem";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function HomeScreen() {
  const [notes, setNotes] = React.useState([
    {
      id: "1",
      text: "Compra leche",
      favorite: false,
      image: require("@/assets/images/react-logo.png"),
    },
    { id: "2", text: "Recordar cumpleaños", favorite: true },
    { id: "3", text: "Escribir informe", favorite: false },
  ]);

  const handleDelete = (id: string) => {
    setNotes((n) => n.filter((note) => note.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setNotes((n) =>
      n.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note,
      ),
    );
  };

  const handleQuickAction = (item: any) => {
    Alert.alert("Acciones", `Nota: ${item.text}`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => handleDelete(item.id),
      },
      {
        text: "Marcar como favorita",
        onPress: () => handleToggleFavorite(item.id),
      },
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mis notas</ThemedText>
      </ThemedView>

      <DraggableFlatList
        data={notes}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setNotes(data)}
        renderItem={({ item, drag, isActive }) => (
          <NoteItem
            item={item}
            drag={drag}
            isActive={isActive}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            onLongPress={handleQuickAction}
          />
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
