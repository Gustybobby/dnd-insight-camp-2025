import type { Effect } from "@/server/domain/models";

export function PlayerStatusesTab({ effects }: { effects: Effect[] }) {
  return (
    <section className="flex flex-col items-start space-y-2 overflow-auto p-4">
      {effects.map((effect) => (
        <EffectDisplay key={effect.id} effect={effect} />
      ))}
    </section>
  );
}

export function EffectDisplay({ effect }: { effect: Effect }) {
  return (
    <article className="motion-preset-pop flex w-full items-center justify-between motion-duration-200 hover:cursor-pointer">
      {/**   <SkillIcon image={playerSkill.skill.image} /> */}
      <div className="flex w-full flex-col items-start px-4 py-2">
        <h1 className="font-notosansthai font-bold">{effect.type}</h1>
        <div className="flex w-full items-center justify-between">
          <p>Last for (Turn):</p>
          <p className="text-xl font-bold">{effect.countdown}</p>
        </div>
      </div>
    </article>
  );
}
