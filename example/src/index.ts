import * as PIXI from "pixi.js";

import {
  Room,
  FloorFurniture,
  Avatar,
  Shroom,
  loadRoomTexture,
} from "@jankuss/shroom";
import { DummyRoom } from "./DummyRoom";

const view = document.querySelector("#root") as HTMLCanvasElement | undefined;
const container = document.querySelector("#container") as
  | HTMLDivElement
  | undefined;
if (view == null || container == null) throw new Error("Invalid view");

const application = new PIXI.Application({
  view,
  antialias: false,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  width: 1600,
  height: 900,
  backgroundColor: 0x000000,
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const shroom = Shroom.create({ application, resourcePath: "./resources" });
const room = Room.create(shroom, {
  tilemap: `
  xxxxxxxxxxxx
  xxxxxxxxxxxx
  xxxxx111111x
  xxxxx111111x
  xxxx1111111x
  xxxxx111111x
  xxxxx111111x
  xxxxx000000x
  xxxxx000000x
  xxx00000000x
  xxx00000000x
  xxx00000000x
  xxx00000000x
  xxxxxxxxxxxx
  xxxxxxxxxxxx
  xxxxxxxxxxxx
   `,
});

const avatar = new Avatar({
  look: "hd-180-1.hr-100-61.ch-210-66.lg-280-110.sh-305-62",
  direction: 2,
  roomX: 0,
  roomY: 2,
  roomZ: 1,
});

room.x = 100;
room.y = 200;

room.wallTexture = loadRoomTexture("./images/tile.png");
room.floorTexture = loadRoomTexture("./images/tile.png");
room.wallColor = "#dbbe6e";
room.floorColor = "#eeeeee";

const furniture = new FloorFurniture({
  roomX: 4,
  roomY: 0,
  direction: 2,
  roomZ: 1,
  type: "exe_table",
  animation: "1",
});

room.addRoomObject(avatar);
room.addRoomObject(furniture);

setTimeout(() => {
  //avatar.walk(0, 1, 1, { direction: 2 });
}, 2000);

application.stage.addChild(room);
