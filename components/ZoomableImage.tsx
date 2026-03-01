import React from "react";
import { ImageStyle, StyleSheet } from "react-native";
import {
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface ZoomableImageProps {
  source: any;
  style?: ImageStyle;
}

export function ZoomableImage({ source, style }: ZoomableImageProps) {
  const scale = useSharedValue(1);

  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    scale.value = event.nativeEvent.scale;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 50 }) }],
    };
  });

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onEnded={() => (scale.value = withTiming(1))}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.Image source={source} style={[style, styles.image]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
