import SoundManagement from "~/sound-design/index.sound-design";
type Type = "url" | "text" | "close" | "both";

const keys: string[] = [];

export const triggerEscape = () => {
  const escape = document.querySelector(".escape");
  const eventEscape = new CustomEvent("escape");
  if (escape) dispatchEvent(eventEscape);
};

export const toggleEscape = (type: string) => {
  const escape = document.querySelector(".escape");
  if (escape) {
    type === "open"
      ? escape.classList.add("escape-show")
      : escape.classList.remove("escape-show");
  }
};

export const triggerDialog = (type: Type, text?: string, url?: string) => {
  const dialog = document.querySelector(".dialog");
  const dialogContent = document.querySelector(".dialogContent");

  if (type === "close") {
    if (dialog && dialogContent) {
      dialog.classList.remove("dialog-displayed");
      dialogContent.innerHTML = "";
    }
  }
  if (type === "url") {
    if (dialog && text && dialogContent) {
      dialogContent.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      const image = document.createElement("img");
      image.src = text;
      dialogContent.appendChild(image);
    }
  }
  if (type === "text") {
    if (dialog && text && dialogContent) {
      dialogContent.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      dialogContent.innerHTML = text;
    }
  }
  if (type === "both") {
    if (dialog && text && url && dialogContent) {
      dialogContent.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      const image = document.createElement("img");
      image.src = url;
      dialogContent.appendChild(image);
      console.log(url);
      const paragraph = document.createElement("div");
      paragraph.innerHTML = text;
      dialogContent.appendChild(paragraph);
    }
  }
};

export const addKeyToUI = (number: number) => {
  const key = document.querySelector(`#key-${number}`);
  if (key) {
    key.classList.add(`key-${number}`);
    keys.push(`key-${number}`);
    triggerDialog(
      "both",
      `<p>Key ${number} fetched ! ${
        keys.length === 3 ? "<br> <br> You've got the final clue !" : ""
      }</p>`,
      `/key${number}.png`
    );
    console.log(keys);
    checkKeys(keys);
  }
};

export const checkKeys = (keys: string[]) => {
  keys.length === 3 ? showClue() : "";
};

export const showClue = () => {
  const keysContainer = document.querySelector("#keys");
  if (keysContainer) {
    setTimeout(() => {
      keysContainer.innerHTML = "";
      keysContainer.textContent = "INDICE";
    }, 800);
  }
};

export const manageAll = () => {
  // Hide debug mode unless `#debug` is present in the URL
  if (window.location.hash !== "#debug") {
    (document.querySelector(".debug-ui") as HTMLDivElement).style.display =
      "none";
    (document.querySelector("#keys") as HTMLDivElement).style.display = "none";
  }

  const soundManager = new SoundManagement();

  const buttonImage = document.querySelector("#dImage");
  const buttonText = document.querySelector("#dText");
  const buttonTextImage = document.querySelector("#dImageText");
  const buttonClose = document.querySelector("#dClose");
  const buttonCloseDialog = document.querySelector(".dialog-close");
  const buttonKeyOne = document.querySelector("#Key1");
  const buttonKeyTwo = document.querySelector("#Key2");
  const buttonKeyThree = document.querySelector("#Key3");
  const buttonEscape = document.querySelector("#escape");
  const buttonEscapeHide = document.querySelector("#escapehide");
  const buttonTriggerEscape = document.querySelector(".escape");
  const buttonMusicTheme = document.querySelector("#theme");
  const buttonMusicMenu = document.querySelector("#menu");
  const buttonMusicRoom1 = document.querySelector("#room1");
  const buttonMusicRoom2 = document.querySelector("#room2");
  const buttonMusicRoom3 = document.querySelector("#room3");
  const buttonMusicRoom4 = document.querySelector("#room4");
  const buttonMusicPattern1 = document.querySelector("#pattern1");
  const buttonMuteHub = document.querySelector("#mutehub");
  const buttonUnmuteHub = document.querySelector("#unmutehub");
  const buttonMuteBGM = document.querySelector("#mutebgm");

  if (buttonImage) {
    buttonImage.addEventListener("click", () => {
      triggerDialog("url", "/key1.png");
    });
  }
  if (buttonClose) {
    buttonClose.addEventListener("click", () => {
      triggerDialog("close");
    });
  }
  if (buttonCloseDialog) {
    buttonCloseDialog.addEventListener("click", () => {
      triggerDialog("close");
    });
  }
  if (buttonText) {
    buttonText.addEventListener("click", () => {
      triggerDialog("text", "Vous avez récupéré un indice");
    });
  }
  if (buttonTextImage) {
    buttonTextImage.addEventListener("click", () => {
      triggerDialog("both", "Vous avez récupéré un indice", "/key2.png");
    });
  }
  if (buttonKeyOne) {
    buttonKeyOne.addEventListener("click", () => {
      addKeyToUI(1);
    });
  }
  if (buttonKeyTwo) {
    buttonKeyTwo.addEventListener("click", () => {
      addKeyToUI(2);
    });
  }
  if (buttonKeyThree) {
    buttonKeyThree.addEventListener("click", () => {
      addKeyToUI(3);
    });
  }
  if (buttonEscape) {
    buttonEscape.addEventListener("click", () => {
      toggleEscape("open");
    });
  }
  if (buttonEscapeHide) {
    buttonEscapeHide.addEventListener("click", () => {
      toggleEscape("close");
    });
  }
  if (buttonTriggerEscape) {
    buttonTriggerEscape.addEventListener("click", () => {
      triggerEscape();
    });
  }
  if (buttonMusicTheme) {
    buttonMusicTheme.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.theme as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicMenu) {
    buttonMusicMenu.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.menu as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicRoom1) {
    buttonMusicRoom1.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.room1 as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicRoom2) {
    buttonMusicRoom2.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.room2 as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicRoom3) {
    buttonMusicRoom3.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.room3 as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicRoom4) {
    buttonMusicRoom4.addEventListener("click", () => {
      soundManager.playBGM(
        soundManager.bgm.room4 as keyof typeof soundManager.bgm,
        true
      );
    });
  }
  if (buttonMusicPattern1) {
    buttonMusicPattern1.addEventListener("click", () => {
      soundManager.instanciateAllPatterns();
    });
  }
  if (buttonMuteHub) {
    buttonMuteHub.addEventListener("click", () => {
      soundManager.fadeOutHubMusic();
    });
  }
  if (buttonUnmuteHub) {
    buttonUnmuteHub.addEventListener("click", () => {
      soundManager.fadeInHubMusic();
    });
  }
  if (buttonMuteBGM) {
    buttonMuteBGM.addEventListener("click", () => {
      soundManager.fadeOutBGMMusic();
    });
  }

  window.addEventListener("escape", () => {
    alert("escape");
  });
};
