import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmi from "tmi.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const TIME_TRESHOLD = 10000;

enum Status {
  IDLE = "IDLE",
  STARTED = "STARTED",
  GAME_OVER = "GAME_OVER",
}

interface Store {
  maxScore: number;
  registerNewScore: (newScore: number) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      maxScore: 0,
      registerNewScore: (newScore) => {
        set((prev) => ({ maxScore: Math.max(prev.maxScore, newScore) }));
      },
    }),
    { name: "numerica" }
  )
);

export default function GamePage() {
  const { channel } = useParams<{ channel: string }>();

  const { maxScore, registerNewScore } = useStore();
  const [state, setState] = useState({
    status: Status.IDLE,
    number: 0,
    user: "",
    time: 0,
  });

  useEffect(() => {
    if (!channel) return;

    const twitchClient = new tmi.Client({
      options: { debug: true },
      channels: [channel],
    });

    twitchClient.connect().catch(console.error);

    twitchClient.on("message", (_channel, tags, message, self) => {
      const { username, "display-name": displayName } = tags;

      const user = displayName || username;
      const number = Number(message);
      const time = Date.now();

      const isValid = isFinite(number) && 0 < number;
      if (self || !user || !isValid) return;

      setState((prev) => {
        if (prev.user === user && time < prev.time + TIME_TRESHOLD) return prev;
        const isSuccess = number === prev.number + 1;
        if (isSuccess) {
          return {
            status: Status.STARTED,
            number: prev.number + 1,
            user: user,
            time: Date.now(),
          };
        } else {
          registerNewScore(prev.number);
          return {
            status: prev.number === 0 ? Status.IDLE : Status.GAME_OVER,
            number: 0,
            user: user,
            time: Date.now(),
          };
        }
      });
    });

    return () => {
      twitchClient.disconnect().catch(console.error);
    };
  }, [channel]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-2 border-rose-400 p-8 rounded-xl min-h-[250px] min-w-[250px] bg-slate-900">
      <p className="text-xl font-bold">Max Score: {maxScore}</p>
      <p className="text-7xl sm:text-9xl font-bold">{state.number}</p>
      <p className="text-xl font-bold">
        {state.status !== Status.GAME_OVER && `Blame on ${state.user}!`}
        {state.status !== Status.STARTED && state.user}
      </p>
    </div>
  );
}
