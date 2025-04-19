import type { PlayerSkillWithInfo } from "@/server/domain/aggregates";

import { cn } from "@/components/utils";
import Image from "next/image";

export function PlayerSkillsTab({
  playerSkills,
  onClick,
}: {
  playerSkills: PlayerSkillWithInfo[];
  onClick?: (skillId: PlayerSkillWithInfo["skillId"]) => void;
}) {
  return (
    <section className="flex flex-col items-start space-y-2 overflow-auto p-4">
      {playerSkills.map((playerSkill) => (
        <PlayerSkillDisplay
          key={playerSkill.skillId}
          playerSkill={playerSkill}
          onClick={onClick}
        />
      ))}
    </section>
  );
}

export function PlayerSkillDisplay({
  playerSkill,
  onClick,
}: {
  playerSkill: PlayerSkillWithInfo;
  onClick?: (skillId: PlayerSkillWithInfo["skillId"]) => void;
}) {
  return (
    <article
      className="motion-preset-pop flex w-full items-center justify-between motion-duration-200 hover:cursor-pointer"
      onClick={() => onClick?.(playerSkill.skillId)}
    >
      <SkillIcon image={playerSkill.skill.image} />
      <div className="flex w-full flex-col items-start px-4 py-2">
        <h1 className="font-notosansthai font-bold">
          {playerSkill.skill.name}
        </h1>
        <div className="flex w-full items-center justify-between">
          <p>Cooldown (Turn):</p>
          <p className="text-xl font-bold">{playerSkill.cooldown}</p>
        </div>
      </div>
    </article>
  );
}

export function SkillIcon({ image }: { image: string }) {
  return (
    <div className="aspect-square size-16 rounded-full border-2 border-black bg-radial-gradient from-seafoam to-dexcolor-in p-4">
      <Image src={image} alt={image} width={128} height={128} />
    </div>
  );
}

export function PlayerSkillInfo({
  playerSkill,
  showPlayerOptions,
  showStaffOptions,
  onClickBack,
  onUse,
  onUngive,
}: {
  playerSkill: PlayerSkillWithInfo | null;
  showPlayerOptions: boolean;
  showStaffOptions?: boolean;
  onClickBack: () => void;
  onUse: (skillId: PlayerSkillWithInfo["skillId"]) => void;
  onUngive?: (skillId: PlayerSkillWithInfo["skillId"]) => void;
}) {
  if (!playerSkill) {
    onClickBack();
    return null;
  }
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-4 p-2">
      <button className="font-bold" onClick={onClickBack}>
        {"←"} Back
      </button>
      <div className="grid w-full grid-cols-4 gap-4">
        <SkillIcon image={playerSkill.skill.image} />
        <h1 className="col-span-3 flex items-center justify-center rounded-full bg-oldcream px-8 py-2 font-notosansthai text-xl font-bold">
          {playerSkill.skill.name}
        </h1>
        <p className="col-span-full text-left font-notosansthai">
          {playerSkill.skill.description}
        </p>
        <p className="col-span-full text-left text-lg font-bold">
          Cooldown (Turn): {playerSkill.cooldown}
        </p>
      </div>
      <div className="flex w-full justify-end">
        {showPlayerOptions ? (
          <button
            className={cn(
              "rounded-full border-2 border-black px-4 py-1 font-bold",
              playerSkill.cooldown > 0 ? "bg-cream/50" : "bg-brown-gradient",
            )}
            onClick={() => onUse(playerSkill.skillId)}
            disabled={playerSkill.cooldown > 0}
          >
            {playerSkill.cooldown > 0 ? "On Cooldown" : "Use"}
          </button>
        ) : null}
      </div>
      {showStaffOptions && (
        <button
          className="rounded-full border-2 border-black bg-red-500 px-4 py-1 font-bold"
          onClick={() => onUngive?.(playerSkill.skillId)}
        >
          Delete Skill
        </button>
      )}
    </div>
  );
}
