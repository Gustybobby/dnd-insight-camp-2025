"use client";

import {
  CharacterBox,
  CharacterModel,
  EquipmentsBar,
  HealthBar,
  StatBar,
  StatsGrid,
  TitleBanner,
} from "@/components/players/components";
import { PlayerTabs } from "@/components/players/PlayerTabs";

export default function PlayerCharacterPage() {
  return (
    <div className="mx-auto mt-[16%] w-11/12 space-y-2 overflow-auto py-2">
      <CharacterBox className="relative z-10 p-2">
        <TitleBanner>Group 1</TitleBanner>
        <div className="grid grid-cols-3 place-items-center p-2 px-8">
          <div className="col-span-2">
            <CharacterModel
              character={{
                id: 1,
                name: "ชาละวัน",
                image: "/asset/characters/chalawan.png",
              }}
            />
          </div>
          <EquipmentsBar equipments={[]} />
        </div>
      </CharacterBox>
      <CharacterBox className="relative z-10">
        <HealthBar health={50} max={100} />
      </CharacterBox>
      <PlayerTabs
        tabs={[
          {
            label: "Stats",
            node: (
              <StatsGrid>
                <StatBar
                  label="Strength"
                  iconSrc="/asset/props/str.png"
                  value={20}
                  max={100}
                  colorClassName="bg-oldpurple"
                />
                <StatBar
                  label="Dexterity"
                  iconSrc="/asset/props/dex.png"
                  value={65}
                  max={100}
                  colorClassName="bg-cyan-700"
                />
                <StatBar
                  label="Charisma"
                  iconSrc="/asset/props/chr.png"
                  value={95}
                  max={100}
                  colorClassName="bg-lightorange"
                />
                <StatBar
                  label="Intelligence"
                  iconSrc="/asset/props/int.png"
                  value={5}
                  max={100}
                  colorClassName="bg-orange-500"
                />
              </StatsGrid>
            ),
          },
          { label: "Inventory", node: <div></div> },
          { label: "Skills", node: <div></div> },
        ]}
        defaultTab="Stats"
      />
    </div>
  );
}
