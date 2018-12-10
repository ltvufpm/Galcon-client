export interface gameRoomEntity {
  id: number;
  activeStatus: boolean;
  maxPlayersCount: number;
  planets: Array<Planet>;
  groups: Array<Group>;
  players Array<Player>;
}