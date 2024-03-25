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
  const infoItems =
    container &&
    container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");

  if (container && title && canvas && infoItems) {
    gsap.registerPlugin(ScrollTrigger);

    const { scene, engine, model } = initScene(canvas);

    engine.runRenderLoop(() => {
      scene.render();
    });

    document.addEventListener("resize", () => {
      engine.resize();
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 835px)", () => {
      descAnim(container, model, title, infoItems);
      return () => {};
    });

    mm.add("(min-width: 0px)", () => {
      tabletAnim(container, model, title, infoItems);
      return () => {};
    });
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

function descAnim(
  container: HTMLElement,
  model: BABYLON.TransformNode,
  title: HTMLElement,
  items: NodeListOf<HTMLElement>,
) {
  const TL = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "bottom bottom",
      end: `${(items.length + 1) * 100}% bottom`,
      scrub: true,
      pin: true,
      // markers: true,
    },
  });

  // step-1
  {
    TL.from(
      model.position,
      {
        y: -2,
        duration: 4,
        ease: "none",
      },
      "step-1",
    );
  }
  // step-2
  {
    TL.to(
      title,
      {
        opacity: 0,
        translateY: "-100%",
        duration: 8,
        ease: "none",
      },
      "step-2",
    );
    TL.to(
      model.rotation,
      {
        y: degToRad(-180),
        z: degToRad(0),
        duration: 8,
        ease: "none",
      },
      "step-2",
    );
    TL.to(
      model.position,
      {
        y: -1,
        duration: 8,
        ease: "none",
      },
      "step-2",
    );

    if (items[0]) {
      TL.from(
        items[0],
        {
          top: "100%",
          opacity: 0,
          duration: 8,
          ease: "none",
        },
        "step-2",
      );
    }
  }
  // step-3
  {
    TL.to(
      model.rotation,
      {
        y: degToRad(-220),
        duration: 8,
        delay: 4,
        ease: "none",
      },
      "step-3",
    );

    if (items[0]) {
      TL.to(
        items[0],
        {
          top: "-50%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-3",
      );
    }

    if (items[1]) {
      TL.from(
        items[1],
        {
          top: "150%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-3",
      );
    }
  }
  // step-4
  {
    TL.to(
      model.rotation,
      {
        y: degToRad(-180),
        duration: 8,
        delay: 4,
        ease: "none",
      },
      "step-4",
    );

    if (items[1]) {
      TL.to(
        items[1],
        {
          top: "-50%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-4",
      );
    }

    if (items[2]) {
      TL.from(
        items[2],
        {
          top: "100%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-4",
      );
    }
  }
  // step-5
  {
    TL.to(container, {
      duration: 4,
      delay: 4,
    });
  }
}

function tabletAnim(
  container: HTMLElement,
  model: BABYLON.TransformNode,
  title: HTMLElement,
  items: NodeListOf<HTMLElement>,
) {
  model.position.z = 0.8;

  const TL = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "bottom bottom",
      end: `${(items.length + 1) * 100}% bottom`,
      scrub: true,
      pin: true,
      // markers: true,
    },
  });

  // step-1
  {
    TL.from(
      model.position,
      {
        y: -2,
        duration: 4,
        ease: "none",
      },
      "step-1",
    );
  }
  // step-2
  {
    TL.to(
      title,
      {
        opacity: 0,
        translateY: "-100%",
        duration: 8,
        ease: "none",
      },
      "step-2",
    );
    TL.to(
      model.rotation,
      {
        y: degToRad(-180),
        z: degToRad(0),
        duration: 8,
        ease: "none",
      },
      "step-2",
    );
    TL.to(
      model.position,
      {
        y: -1,
        x: -0.2,
        z: 2,
        duration: 8,
        ease: "none",
      },
      "step-2",
    );

    if (items[0]) {
      TL.from(
        items[0],
        {
          top: "100%",
          opacity: 0,
          duration: 8,
          ease: "none",
        },
        "step-2",
      );
    }
  }
  // step-3
  {
    TL.to(
      model.rotation,
      {
        y: degToRad(-220),
        duration: 8,
        delay: 4,
        ease: "none",
      },
      "step-3",
    );

    if (items[0]) {
      TL.to(
        items[0],
        {
          top: "-50%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-3",
      );
    }

    if (items[1]) {
      TL.from(
        items[1],
        {
          top: "150%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-3",
      );
    }
  }
  // step-4
  {
    TL.to(
      model.rotation,
      {
        y: degToRad(-180),
        duration: 8,
        delay: 4,
        ease: "none",
      },
      "step-4",
    );

    if (items[1]) {
      TL.to(
        items[1],
        {
          top: "-50%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-4",
      );
    }

    if (items[2]) {
      TL.from(
        items[2],
        {
          top: "100%",
          opacity: 0,
          duration: 8,
          delay: 4,
          ease: "none",
        },
        "step-4",
      );
    }
  }
  // step-5
  {
    TL.to(container, {
      duration: 4,
      delay: 4,
    });
  }
}