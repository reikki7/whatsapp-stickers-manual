// WhatsAppStickerSend.js
import { Platform, Linking } from "react-native";

/**
 * Send WhatsApp sticker pack
 * @param {string} identifier - Unique identifier for the sticker pack
 * @param {string} stickerPackName - Name of the sticker pack
 * @returns {Promise<boolean>} - Indicates if the sticker pack send was initiated
 */
export const sendWhatsAppStickerPack = async (identifier, stickerPackName) => {
  try {
    // WhatsApp's custom URL scheme for adding sticker packs
    const androidWhatsAppUrl = `https://wa.me/send?text=Add%20Sticker%20Pack%20${encodeURIComponent(
      identifier
    )}`;
    const iosWhatsAppUrl = `whatsapp://stickerpack?identifier=${encodeURIComponent(
      identifier
    )}`;

    let url;
    if (Platform.OS === "android") {
      // For Android, use the intent-based approach
      url =
        `intent://send/${encodeURIComponent(identifier)}#Intent;` +
        `package=com.whatsapp;` +
        `action=com.whatsapp.intent.action.ENABLE_STICKER_PACK;` +
        `S.sticker_pack_id=${encodeURIComponent(identifier)};` +
        `S.sticker_pack_name=${encodeURIComponent(stickerPackName)};` +
        `end`;
    } else if (Platform.OS === "ios") {
      // For iOS, use the WhatsApp URL scheme
      url = iosWhatsAppUrl;
    } else {
      throw new Error("Unsupported platform");
    }

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL
      await Linking.openURL(url);
      return true;
    } else {
      console.warn("Cannot open WhatsApp URL");
      return false;
    }
  } catch (error) {
    console.error("Error sending WhatsApp sticker pack:", error);
    return false;
  }
};

export default sendWhatsAppStickerPack;
