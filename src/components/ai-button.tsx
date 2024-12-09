import { useEffect, useMemo, useState } from "react";
import { Sparkle } from "lucide-react";
import { loadFull } from "tsparticles";

import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import React from "react";

const options: ISourceOptions = {
  key: "star",
  name: "Star",
  particles: {
    number: {
      value: 10,
      density: {
        enable: false,
      },
    },
    color: {
      value: ["#7c3aed", "#bae6fd", "#a78bfa", "#93c5fd", "#0284c7", "#fafafa", "#38bdf8"],
    },
    shape: {
      type: "star",
      options: {
        star: {
          sides: 4,
        },
      },
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      enable: true,
      direction: "clockwise",
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
    },
    links: {
      enable: false,
    },
    reduceDuplicates: true,
    move: {
      enable: true,
      center: {
        x: 120,
        y: 45,
      },
    },
  },
  interactivity: {
    events: {},
  },
  smooth: true,
  fpsLimit: 120,
  background: {
    color: "transparent",
    size: "cover",
  },
  fullScreen: {
    enable: false,
  },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: {
        value: 1,
        density: 1,
        limit: {
          radius: 5,
          mass: 5,
        },
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: {
        wait: true,
      },
      rate: {
        quantity: 5,
        delay: 0.5,
      },
      position: {
        x: 110,
        y: 45,
      },
    },
  ],
};

export default function AiButton() {
  const [particleState, setParticlesReady] = useState<"loaded" | "ready">();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesReady("loaded");
    });
  }, []);

  const modifiedOptions = useMemo(() => {
    options.autoPlay = true; // Keep hover animation active at all times
    return options;
  }, []);

  return (
    <button
  className="group relative my-6 mx-auto flex w-full max-w-sm lg:max-w-md rounded-full bg-gradient-to-r from-green-400/30 via-[#7ed957]/50 to-green-600/30 p-1 text-white transition-transform hover:scale-105 active:scale-95"
>
  <div className="relative flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-green-400 via-[#7ed957] to-green-600 px-5 py-3 text-white">
    <Sparkle className="size-5 -translate-y-0.5 animate-sparkle fill-white" />
    <span className="font-semibold text-base lg:text-lg">Start Coding</span>
  </div>
  {!!particleState && (
    <Particles
      id="whatever"
      className={`pointer-events-none absolute -bottom-3 -left-3 -right-3 -top-3 z-0 opacity-100`}
      options={modifiedOptions}
    />
  )}
</button>
  );
}