export interface IPoint {
  x: number;
  y: number;
}

export interface ISpeed {
  vx: number; // horizontal velocity
  vy: number; // vertical velocity
  ax: number; // horizontal acceleration
  ay: number; // vertical acceleration
}

// container info
export interface IContainer {
  position: IPoint;
  width: number;
  height: number;
}

export interface iContextConfig {
  width: number;
  height: number;
}

export type SpeedContext = {
  h_revert: boolean; // horizontal speed allow revert
  v_revert: boolean; // vertical speed allow revert
}