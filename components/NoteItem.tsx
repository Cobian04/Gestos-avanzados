import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
    GestureHandlerRootView,
    Swipeable,
    TapGestureHandler,
} from "react-native-gesture-handler";
import { ZoomableImage } from "./ZoomableImage";

interface Note {
  id: string;
  text: string;
  image?: any;
  favorite: boolean;
}

interface NoteItemProps {
  item: Note;
  drag: () => void;
  isActive: boolean;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onLongPress: (item: Note) => void;
}

export function NoteItem({
  item,
  drag,
  isActive,
  onDelete,
  onToggleFavorite,
  onLongPress,
}: NoteItemProps) {
  // Render the right swipeable delete button
  const renderRightActions = () => (
    <Pressable style={styles.deleteButton} onPress={() => onDelete(item.id)}>
      <IconSymbol name="trash" size={24} color="white" />
    </Pressable>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={() => onToggleFavorite(item.id)}
        >
          <Pressable
            onLongPress={() => onLongPress(item)}
            delayLongPress={500}
            style={[styles.container, isActive && styles.active]}
          >
            <View style={styles.row}>
              <Pressable onLongPress={drag} style={styles.handle}>
                <IconSymbol name="line.horizontal.3" size={20} color="#888" />
              </Pressable>
              <ThemedView style={styles.content}>
                <ThemedText>{item.text}</ThemedText>
                {item.image && <ZoomableImage source={item.image} />}
              </ThemedView>
              {item.favorite && (
                <IconSymbol name="heart.fill" size={20} color="red" />
              )}
            </View>
          </Pressable>
        </TapGestureHandler>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "white",
  },
  active: {
    backgroundColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  handle: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
});
