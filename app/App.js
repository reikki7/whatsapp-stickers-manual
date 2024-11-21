// App.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import RNWhatsAppStickers from "react-native-whatsapp-stickers";
import stickerConfig from "./stickerConfig";
import { sendWhatsAppStickerPack } from "./WhatsAppStickerSend";

export default function App() {
  const initStickers = async () => {
    try {
      const isWhatsAppAvailable =
        await RNWhatsAppStickers.isWhatsAppAvailable();

      if (!isWhatsAppAvailable) {
        console.log("WhatsApp is not available");
        return;
      }

      if (Platform.OS === "ios") {
        await RNWhatsAppStickers.createStickerPack({
          identifier: stickerConfig.identifier,
          name: stickerConfig.name,
          publisher: stickerConfig.publisher,
          trayImageFile: stickerConfig.trayImageFile,
        });

        const promises = stickerConfig.stickers.map((sticker) =>
          RNWhatsAppStickers.addSticker(sticker.fileName, sticker.emojis)
        );

        await Promise.all(promises);
        await sendWhatsAppStickerPack(
          stickerConfig.identifier,
          stickerConfig.name
        );
      } else {
        // For Android
        await sendWhatsAppStickerPack(
          stickerConfig.identifier,
          stickerConfig.name
        );
      }
    } catch (error) {
      console.error("Error initializing stickers:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Iyagi Sticker App!</Text>
      <Button title="Send Stickers" onPress={initStickers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
