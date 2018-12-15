import Planet from './planetEntity'
import Player from './playerEntity'
import Group from './groupEntity'
export interface gameRoomEntity {
  id: number;
  activeStatus: boolean;
  maxPlayersCount: number;
  planets: Array<Planet>;
  groups: Array<Group>;
  players: Array<Player>;
}