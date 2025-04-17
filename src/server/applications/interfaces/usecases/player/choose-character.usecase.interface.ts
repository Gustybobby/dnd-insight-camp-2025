export interface IChooseCharacterUseCase {
  invoke({
    playerId,
    characterId,
  }: {
    playerId: number;
    characterId: number;
  }): Promise<void>;
}
