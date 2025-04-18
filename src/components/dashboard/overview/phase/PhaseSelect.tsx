"use client";

import type { GlobalType } from "@/server/domain/models";

import { PhaseEnum } from "@/server/domain/models";
import { setGlobalPhase } from "@/server/controllers/global.controller";

import React from "react";
import { useMutation } from "@tanstack/react-query";

interface PhaseSelectProp {
  phase: GlobalType["phase"];
  refetch: () => void;
}

export default function PhaseSelect({ phase, refetch }: PhaseSelectProp) {
  const setGlobalPhaseMutation = useMutation({ mutationFn: setGlobalPhase });

  const handleOnChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedPhase = event.target.value as PhaseEnum;
    await setGlobalPhaseMutation
      .mutateAsync({ phase: selectedPhase })
      .catch((error) => console.error(error));
    refetch();
  };
  return (
    <select
      value={phase}
      onChange={(event) => handleOnChange(event)}
      className="bg-slate-200 px-4 py-2 text-lg"
    >
      {PhaseEnum.options.map((phase, index) => (
        <option key={index} value={phase}>
          {phase}
        </option>
      ))}
    </select>
  );
}
