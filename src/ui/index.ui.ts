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
  if (type === "close") {
    if (dialog) {
      dialog.classList.remove("dialog-displayed");
      dialog.innerHTML = "";
    }
  }
  if (type === "url") {
    if (dialog && text) {
      dialog.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      const image = document.createElement("img");
      image.src = text;
      dialog.appendChild(image);
    }
  }
  if (type === "text") {
    if (dialog && text) {
      dialog.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      dialog.innerHTML = text;
    }
  }
  if (type === "both") {
    if (dialog && text && url) {
      dialog.innerHTML = "";
      dialog.classList.add("dialog-displayed");
      const image = document.createElement("img");
      image.src = url;
      dialog.appendChild(image);
      console.log(url);
      const paragraph = document.createElement("div");
      paragraph.innerHTML = text;
      dialog.appendChild(paragraph);
    }
  }
};

export const addKeyToUI = (number: number) => {
  const key = document.querySelector(`#key-${number}`);
  if (key) {
    key.classList.add(`key-${number}`);
    keys.push(`key-${number}`);
    triggerDialog("both", `<p>Key ${number} fetched ! ${keys.length === 3 ? '<br> <br> You\'ve got the final clue !' : ''}</p>`, `/key${number}.png`);
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
  const buttonImage = document.querySelector("#dImage");
  const buttonText = document.querySelector("#dText");
  const buttonTextImage = document.querySelector("#dImageText");
  const buttonClose = document.querySelector("#dClose");
  const buttonKeyOne = document.querySelector("#Key1");
  const buttonKeyTwo = document.querySelector("#Key2");
  const buttonKeyThree = document.querySelector("#Key3");
  const buttonEscape = document.querySelector("#escape");
  const buttonEscapeHide = document.querySelector("#escapehide");
  const buttonTriggerEscape = document.querySelector(".escape");

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

  window.addEventListener("escape", () => {
    alert("escape");
  });
};
