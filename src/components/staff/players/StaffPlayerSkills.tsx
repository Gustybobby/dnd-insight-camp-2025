import type { Skill } from "@/server/domain/models";

import { SkillCard } from "./components";

export default function StaffPlayerSkills({
  onClickSkill,
  skills,
}: {
  skills: Skill[] | null;
  onClickSkill: ({ label, data }: { label: string; data: Skill }) => void;
}) {
  return (
    <div className="flex flex-col gap-y-1 p-2">
      {skills?.map((skill) => {
        return (
          <SkillCard
            skill={skill}
            onClick={() => onClickSkill({ label: "Skill", data: skill })}
          />
        );
      })}
    </div>
  );
}
