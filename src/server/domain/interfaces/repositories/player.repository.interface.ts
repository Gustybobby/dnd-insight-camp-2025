import type {
  PlayerItemWithInfo,
  PlayerWithAllInfo,
  PlayerWithCharacter,
  PlayerWithItemsAndEquipments,
  PlayerWithSkills,
} from "@/server/domain/aggregates";
import type {
  Character,
  Player,
  PlayerCreate,
  PlayerStat,
  PlayerStatLogCreate,
  PlayerUpdate,
  User,
} from "@/server/domain/models";

export interface IPlayerRepository {
  getAllWithCharacter(): Promise<PlayerWithCharacter[]>;

  getByIdOrThrow({ playerId }: { playerId: Player["id"] }): Promise<Player>;

  getByUserId({ userId }: { userId: User["id"] }): Promise<Player | null>;

  getCharacterOrThrow({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Character>;

  getAllStats({ playerId }: { playerId: Player["id"] }): Promise<PlayerStat[]>;

  getAllItems({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<PlayerItemWithInfo[]>;

  create({ data }: { data: PlayerCreate }): Promise<Player>;

  createStat({ data }: { data: PlayerStat }): Promise<PlayerStat>;

  update({
    playerId,
    data,
  }: {
    playerId: Player["id"];
    data: PlayerUpdate;
  }): Promise<void>;

  updateStat({ data }: { data: PlayerStatLogCreate }): Promise<PlayerStat>;

  setStats({ data }: { data: PlayerStat[] }): Promise<PlayerStat[]>;

  removeAllItemsAndEquipments({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Pick<PlayerWithItemsAndEquipments, "playerItems" | "equipments">>;

  removeAllSkills({
    playerId,
  }: {
    playerId: Player["id"];
  }): Promise<Pick<PlayerWithSkills, "playerSkills">>;
}
