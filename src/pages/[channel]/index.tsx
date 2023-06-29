import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import tmi from "tmi.js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

  const [twitchClient, setTwitchClient] = useState<tmi.Client | null>(null);

  useEffect(() => {
    if (!channel) return;

    const twitchClient = new tmi.Client({ channels: [channel] });

    twitchClient.connect().catch(console.error);

    setTwitchClient(twitchClient);

    return () => {
      twitchClient.disconnect().catch(console.error);
    };
  }, [channel]);

  const { maxScore, registerNewScore } = useStore();
  const [state, setState] = useState({
    status: Status.IDLE,
    number: 0,
    user: "",
  });

  const handleNewMessage = useCallback(
    (
      _channel: string,
      tags: tmi.ChatUserstate,
      message: string,
      self: boolean
    ) => {
      if (self) return;

      const user = tags.displayName || tags.username;
      if (!user) return;

      const number = Number(message);
      const isFiniteNumber = isFinite(number);
      const isIntegerNumber = number % 1 === 0;
      const isPositiveNumber = number > 0;
      if (!isFiniteNumber || !isIntegerNumber || !isPositiveNumber) return;

      setState((prev) => {
        if (prev.user === user) return prev;

        const isSuccess = number === prev.number + 1;
        if (isSuccess) {
          registerNewScore(number);
          return {
            status: Status.STARTED,
            number: prev.number + 1,
            user: user,
          };
        } else {
          return {
            status: prev.number === 0 ? Status.IDLE : Status.GAME_OVER,
            number: 0,
            user: user,
          };
        }
      });
    },
    [setState, registerNewScore]
  );

  useEffect(() => {
    if (!twitchClient) return;
    twitchClient.on("message", handleNewMessage);
    return () => {
      twitchClient.removeListener("message", handleNewMessage);
    };
  }, [twitchClient, handleNewMessage]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-8 border-rose-400 p-8 rounded-xl h-full w-full grow max-h-[300px] max-w-[300px] bg-slate-900">
      <p className="text-xl font-bold">Max Score: {maxScore}</p>
      <p className="text-9xl font-bold">{state.number}</p>
      <p className="text-xl font-bold whitespace-nowrap">
        {state.status === Status.GAME_OVER
          ? `Blame on ${state.user}!`
          : state.status === Status.STARTED
          ? state.user
          : ""}
      </p>
    </div>
  );
}
