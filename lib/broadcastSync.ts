/**
 * Local-only multi-tab sync (BroadcastChannel). No network.
 * Same channel name connects all tabs/windows of this origin.
 */

const CHANNEL_NAME = "whitescreen_sync";

const sourceId =
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `wst-${Math.random().toString(36).slice(2)}`;

let channel: BroadcastChannel | null = null;

export type SyncMessageType = "color" | "brightness" | "kelvin";

export interface SyncPayload {
  type: SyncMessageType;
  value: string | number;
  sourceId: string;
}

function getChannel(): BroadcastChannel | null {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") {
    return null;
  }
  if (!channel) {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch {
      return null;
    }
  }
  return channel;
}

/** Send to other tabs (same tab listeners should ignore matching sourceId). */
export function postWhiteScreenSync(type: SyncMessageType, value: string | number) {
  const ch = getChannel();
  if (!ch) return;
  try {
    ch.postMessage({ type, value, sourceId } satisfies SyncPayload);
  } catch {
    // ignore
  }
}

export function getBroadcastSourceId(): string {
  return sourceId;
}

export function subscribeWhiteScreenSync(
  handler: (payload: Omit<SyncPayload, "sourceId">) => void,
): () => void {
  const ch = getChannel();
  if (!ch) return () => {};

  const onMessage = (event: MessageEvent<SyncPayload>) => {
    const data = event.data;
    if (!data || typeof data !== "object") return;
    if (data.sourceId === sourceId) return;
    if (data.type !== "color" && data.type !== "brightness" && data.type !== "kelvin") {
      return;
    }
    handler({ type: data.type, value: data.value });
  };

  ch.addEventListener("message", onMessage);
  return () => ch.removeEventListener("message", onMessage);
}
