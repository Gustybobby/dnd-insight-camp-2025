import type { Effect } from "@/server/domain/models";

import { VISUAL_EFFECT_LISTS } from "@/components/staff/constants";
import Image from "next/image";

export function PlayerStatusesTab({
  effects,
  showStaffOptions,
  onClear,
}: {
  effects: Effect[];
  showStaffOptions?: boolean;
  onClear?: (effectId: Effect["id"]) => void;
}) {
  return (
    <section className="flex flex-col items-start space-y-2 overflow-auto p-4">
      {effects.map((effect) => (
        <EffectDisplay
          key={effect.id}
          effect={effect}
          showStaffOptions={showStaffOptions}
          onClear={onClear}
        />
      ))}
    </section>
  );
}

export function EffectDisplay({
  effect,
  showStaffOptions,
  onClear,
}: {
  effect: Effect;
  showStaffOptions?: boolean;
  onClear?: (effectId: Effect["id"]) => void;
}) {
  const vfxImage = VISUAL_EFFECT_LISTS.find(
    (vfx) => vfx.name === effect.type,
  )?.image;

  return (
    <article className="motion-preset-pop flex w-full items-center justify-between motion-duration-200 hover:cursor-pointer">
      {!!vfxImage && <EffectIcon image={vfxImage} />}
      <div className="flex w-full flex-col items-start px-4 py-2">
        <h1 className="font-notosansthai font-bold">{effect.type}</h1>
        <div className="flex w-full items-center justify-between">
          <p>Last for (Turn):</p>
          <p className="text-xl font-bold">{effect.countdown}</p>
        </div>
        {showStaffOptions ? (
          <button
            className="rounded-full border-2 border-black bg-red-500 px-4 py-1 font-bold"
            onClick={() => onClear?.(effect.id)}
          >
            Delete Status
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function EffectIcon({ image }: { image: string }) {
  return (
    <div className="aspect-square size-16 rounded-full border-2 border-black bg-radial-gradient from-seafoam to-dexcolor-in p-4">
      <Image src={image} alt={image} width={128} height={128} />
    </div>
  );
}
