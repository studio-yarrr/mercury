import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export function initMainAbout() {
  const container = document.querySelector<HTMLElement>(".main-about");
  const title =
    container && container.querySelector<HTMLElement>(".main-about__title");
  const canvas =
    container &&
    container.querySelector<HTMLCanvasElement>(".main-about__canvas");
  const infiItems =
    container &&
    container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");

  if (container && title && canvas && infiItems) {
    gsap.registerPlugin(ScrollTrigger);

    const { scene, engine, model } = initScene(canvas);

    engine.runRenderLoop(() => {
      scene.render();
    });

    document.addEventListener("resize", () => {
      engine.resize();
    });

    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "bottom bottom",
        end: "1000% bottom",
        scrub: true,
        pin: true,
        // markers: true,
      },
    });

    const tl_1 = gsap.timeline();
    tl_1.from(
      model.position,
      {
        y: -2,
        duration: 5,
        ease: "none",
      },
      "-=10",
    );

    TL.add(tl_1);

    const tl_2 = gsap.timeline();
    tl_2.to(
      title,
      {
        translateY: "-100%",
        opacity: 0,
        duration: 5,
        ease: "none",
      },
      "sin",
    );
    tl_2.to(
      model.rotation,
      {
        y: degToRad(-180),
        z: degToRad(0),
        duration: 10,
        ease: "none",
      },
      "sin",
    );
    tl_2.to(
      model.position,
      {
        y: -1,
        x: -0.25,
        duration: 10,
      },
      "sin",
    );
    infiItems[0] &&
      tl_2.from(
        infiItems[0],
        {
          top: "100%",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    TL.add(tl_2);

    const tl_3 = gsap.timeline({
      delay: 8,
    });
    tl_3.to(
      model.rotation,
      {
        delay: 10,
        y: degToRad(-200),
        duration: 10,
      },
      "sin",
    );
    infiItems[0] &&
      tl_3.to(
        infiItems[0],
        {
          delay: 10,
          top: "-50%",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    infiItems[1] &&
      tl_3.from(
        infiItems[1],
        {
          delay: 10,
          top: "150%",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    TL.add(tl_3);

    const tl_4 = gsap.timeline({
      delay: 8,
    });
    tl_4.to(
      model.rotation,
      {
        delay: 10,
        y: degToRad(-180),
        duration: 10,
      },
      "sin",
    );
    tl_4.to(
      model.position,
      {
        delay: 10,
        z: 0.5,
        x: 0.2,
        duration: 10,
      },
      "sin",
    );
    infiItems[1] &&
      tl_4.to(
        infiItems[1],
        {
          delay: 10,
          top: "0",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    infiItems[2] &&
      tl_4.from(
        infiItems[2],
        {
          delay: 10,
          top: "150%",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    TL.add(tl_4);

    const tl_5 = gsap.timeline({
      delay: 8,
    });
    infiItems[3] &&
      tl_5.to(
        infiItems[3],
        {
          top: "0",
          opacity: 0,
          duration: 10,
        },
        "sin",
      );
    TL.add(tl_5);
  }
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180.0);
}

function initScene(canvas: HTMLCanvasElement) {
  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 0, -3),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());

  const mainLight = new BABYLON.HemisphericLight(
    "mainLight",
    new BABYLON.Vector3(-10, 0, -10),
    scene,
  );
  mainLight.intensity = 0.5;

  const light_1 = new BABYLON.PointLight(
    "light_1",
    new BABYLON.Vector3(-1, 1, -1),
    scene,
  );
  light_1.intensity = 3;

  const light_2 = new BABYLON.PointLight(
    "light_2",
    new BABYLON.Vector3(1, 1, -1),
    scene,
  );
  light_2.intensity = 5;

  const model = new BABYLON.TransformNode("model");

  BABYLON.SceneLoader.ImportMesh(
    "",
    "./models/",
    "3600.glb",
    scene,
    function (meshes) {
      const transform = new BABYLON.TransformNode("");
      meshes.forEach((mesh) => {
        mesh.setParent(transform);
      });
      transform.parent = model;
    },
  );

  model.position.y = -0.5;
  model.rotation.y = degToRad(-90);
  model.rotation.z = degToRad(90);

  return {
    scene,
    engine,
    model,
  };
}
