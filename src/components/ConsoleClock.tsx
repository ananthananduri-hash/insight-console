"use client";

import { useEffect, useState } from "react";

export default function ConsoleClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time ?? "--:--:--"}</span>;
}
