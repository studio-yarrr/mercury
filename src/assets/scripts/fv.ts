import Inputmask from "inputmask";

export const formValidateInit = (wrapperSelector: string) => {
  const dataAction = "data-action";
  const validClass = "valid";
  const invalidClass = "invalid";
  const dataMaskSelector = "[data-mask-init]";
  const countryMaskWrapperSelector = "[data-country-mask]";
  const requiredSelector = "[required]";
  const countryMaskAction = "change-mask";
  const inputTextAction = "required-text";
  const inputNumberAction = "required-number";
  const inputEmailAction = "required-email";
  const emailInputControlAction = "email-input-control";
  const radiobuttonAction = "required-radiobutton";
  const checkboxAction = "required-checkbox";
  const selectAction = "required-select";
  const fileAction = "input-file";
  const fileMultipleAction = "input-file-multiple";
  const inputPasswordAction = "input-password";
  const numInset = "num-inset";
  const formSubmit = "form-submit";
  const submitMessage = "submit-message";

  const inputMaskInit = (node: HTMLInputElement) => {
    const nodeMask = node.dataset.mask || "";
    const regexpMask: string = node.dataset.regexp || "";
    const nodePlaceholder = node.dataset.placeholder;
    const config: Inputmask.Options = {
      showMaskOnHover: false,
      clearMaskOnLostFocus: true,
      clearIncomplete: true,
      oncleared: function () {
        if (node.required) {
          node.setCustomValidity("Invalid field");
          checkNodeValidity(node);
        }
      },
      onincomplete: function () {
        if (node.required) {
          node.setCustomValidity("Invalid field");
          checkNodeValidity(node);
        }
      },
      oncomplete: function () {
        if (node.required) {
          node.setCustomValidity("");
          checkNodeValidity(node);
        }
      },
    };

    if (nodePlaceholder) {
      config["placeholder"] = nodePlaceholder;
    }

    if (regexpMask) {
      Inputmask("", {
        regex: regexpMask,
        ...config,
      }).mask(node);
    } else {
      Inputmask(nodeMask, config).mask(node);
    }
  };

  const wrapperSetValid = (wrapper: HTMLElement) => {
    wrapper.classList.add(validClass);
    wrapper.classList.remove(invalidClass);
  };

  const wrapperSetInvalid = (wrapper: HTMLElement) => {
    wrapper.classList.add(invalidClass);
    wrapper.classList.remove(validClass);
  };

  const checkNodeValidity = (node: HTMLInputElement) => {
    const wrapper = node.closest<HTMLElement>(wrapperSelector);

    if (wrapper) {
      if (node.validity.valid) {
        wrapperSetValid(wrapper);
        return true;
      } else {
        wrapperSetInvalid(wrapper);
        return false;
      }
    } else {
      return false;
    }
  };

  const removeFieldValidity = (node: HTMLInputElement) => {
    const wrapper = node.closest<HTMLElement>(wrapperSelector);

    node.required = false;
    node.setCustomValidity("");

    if (wrapper) {
      wrapper.classList.remove(validClass);
      wrapper.classList.remove(invalidClass);
    }
  };

  const resetFieldValidity = (node: HTMLInputElement) => {
    const wrapper = node.closest<HTMLElement>(wrapperSelector);

    node.setCustomValidity("");
    if (wrapper) {
      wrapper.classList.remove(validClass);
      wrapper.classList.remove(invalidClass);
    }
  };

  const removeLetters = (node: HTMLInputElement) => {
    if (node.value.match(/[^0-9^+]/g)) {
      node.value = node.value.replace(/[^0-9]/g, "");
    }
  };

  const checkEmailField = (node: HTMLInputElement) => {
    const nodeValue = node.value;

    nodeValue.length > 0 &&
    (
      nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) ||
      []
    ).length !== 1
      ? node.setCustomValidity("Заполните это поле")
      : node.setCustomValidity("");

    checkNodeValidity(node);
  };

  const emailInputControl = (node: HTMLInputElement) => {
    const nodeValue = node.value;

    if (
      nodeValue.length > 0 &&
      (
        nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) ||
        []
      ).length !== 1
    ) {
      node.setCustomValidity("Заполните это поле");
      node.required = true;
      checkNodeValidity(node);
    } else if (nodeValue === "") {
      removeFieldValidity(node);
    } else {
      node.setCustomValidity("");
      node.required = false;
      checkNodeValidity(node);
    }
  };

  const updateGroupCheckboxesValidity = (node: HTMLInputElement) => {
    const wrapper = node.closest<HTMLElement>(wrapperSelector);
    if (wrapper) {
      const checkboxes = wrapper.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]',
      );
      const checkboxChecked = wrapper.querySelector<HTMLInputElement>(
        'input[type="checkbox"]:checked',
      );
      const checkboxNotChecked = wrapper.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:not(:checked)',
      );

      if (checkboxChecked) {
        Array.from(checkboxNotChecked).map((item) => {
          item.required = false;
        });

        checkNodeValidity(checkboxChecked);
      } else {
        Array.from(checkboxes).map((item) => {
          item.required = true;
        });

        checkNodeValidity(node);
      }
    }
  };

  const inputFileHandler = (node: HTMLInputElement) => {
    const files = node.files;
    const closestWrapper = node.closest<HTMLElement>(wrapperSelector);

    if (closestWrapper && files) {
      const pseudoInput =
        closestWrapper.querySelector<HTMLElement>(".input-file");

      if (pseudoInput) {
        const dataText = pseudoInput.dataset.text || "";

        files.length
          ? (pseudoInput.textContent = files[0].name)
          : (pseudoInput.textContent = dataText);

        if (node.required) {
          checkNodeValidity(node);
        }
      }
    }
  };

  const inputPasswordCheckValidity = (node: HTMLInputElement) => {
    const closestWrapper = node.closest("form");

    if (closestWrapper) {
      const passwordFields = Array.from(
        closestWrapper.querySelectorAll<HTMLInputElement>(
          "[data-password-field]",
        ),
      );

      passwordFields[0].value === passwordFields[1].value
        ? passwordFields.map((item) => item.setCustomValidity(""))
        : passwordFields.map((item) => item.setCustomValidity("Invalid field"));

      passwordFields.map((item) => checkNodeValidity(item));
    }
  };

  const inputMaskNodes =
    document.querySelectorAll<HTMLInputElement>(dataMaskSelector);
  if (inputMaskNodes) {
    Array.from(inputMaskNodes).map((item) => inputMaskInit(item));
  }

  const updateCountryMask = (input: HTMLInputElement) => {
    const closest = input.closest(countryMaskWrapperSelector);
    const inputTel =
      closest &&
      closest.querySelector<HTMLInputElement>("input[data-mask-init]");

    const mask = input.dataset.mask;
    const placeholder = input.dataset.maskPlaceholder;

    if (inputTel) {
      if (inputTel.inputmask) {
        inputTel.inputmask.remove();
      }

      if (mask === "other") {
        inputTel.value = "";
        placeholder && inputTel.setAttribute("placeholder", placeholder);
        inputTel.setAttribute("data-mask", "");
        placeholder && inputTel.setAttribute("data-placeholder", placeholder);
        inputTel.setAttribute(dataAction, inputTextAction);
      } else {
        inputTel.setAttribute(dataAction, "");
        placeholder && inputTel.setAttribute("placeholder", placeholder);
        mask && inputTel.setAttribute("data-mask", mask);
        placeholder && inputTel.setAttribute("data-placeholder", placeholder);
        inputMaskInit(inputTel);
      }
    }
  };

  document.addEventListener("click", (e) => {
    const eTarget = (e.target as HTMLElement).closest(`[${dataAction}]`);
    const submit = (e.target as HTMLElement).closest("[type='submit']");

    if (eTarget && submit) {
      const actions = eTarget.getAttribute(dataAction);
      const targetNode = e.target as HTMLElement;

      if (actions && targetNode) {
        actions.split(" ").map((item) => {
          if (item === formSubmit) {
            const selectors = [
              `[${dataAction}="${inputTextAction}"]`,
              `[${dataAction}="${inputNumberAction}"]`,
              `[${dataAction}="${inputEmailAction}"]`,
              `[${dataAction}="${selectAction}"]`,
              `[${dataAction}="${radiobuttonAction}"]`,
              `[${dataAction}="${checkboxAction}"]`,
              `[${dataAction}="${inputPasswordAction}"]`,
              `[${dataAction}="${fileAction}"]${requiredSelector}`,
              `[${dataAction}="${fileMultipleAction}"]${requiredSelector}`,
              `${dataMaskSelector}${requiredSelector}`,
            ];

            const closestForm = targetNode.closest("form");

            if (closestForm) {
              const requiredFields =
                closestForm.querySelectorAll<HTMLInputElement>(
                  selectors.join(", "),
                );

              if (requiredFields) {
                const vlaidList: boolean[] = [];

                Array.from(requiredFields).map((item) => {
                  vlaidList.push(checkNodeValidity(item));
                });

                if (!vlaidList.includes(false)) {
                  // const sendHandlerContainer =
                  //   closestForm.closest<HTMLElement>(sendHandler);
                  // if (sendHandlerContainer) {
                  //   closestForm.onsubmit = (e) => e.preventDefault();
                  //   sendHandlerContainer.classList.add("_sended");
                  // }
                }
              }
            }
          }
        });
      }
    }
  });

  document.addEventListener("input", (e) => {
    const eTarget = (e.target as HTMLElement).closest<HTMLInputElement>(
      `[${dataAction}]`,
    );

    if (eTarget) {
      const actions = eTarget.getAttribute(dataAction);

      if (actions) {
        actions.split(" ").map((item) => {
          if (item === inputTextAction || item === inputNumberAction) {
            checkNodeValidity(eTarget);
          }

          if (item === inputEmailAction) {
            checkEmailField(eTarget);
          }

          if (item === emailInputControlAction) {
            emailInputControl(eTarget);
          }

          if (item === numInset) {
            removeLetters(eTarget);
          }

          if (item === inputPasswordAction) {
            inputPasswordCheckValidity(eTarget);
          }
        });
      }
    }
  });

  document.addEventListener("change", (e) => {
    const eTarget = (e.target as HTMLElement).closest<HTMLInputElement>(
      `[${dataAction}]`,
    );

    if (eTarget) {
      const actions = eTarget.getAttribute(dataAction);

      if (actions) {
        actions.split(" ").map((item) => {
          if (item === radiobuttonAction || item === selectAction) {
            checkNodeValidity(eTarget);
          }

          if (item === checkboxAction) {
            updateGroupCheckboxesValidity(eTarget);
          }

          if (item === fileAction) {
            inputFileHandler(eTarget);
          }

          if (item === countryMaskAction) {
            updateCountryMask(eTarget);
          }
        });
      }
    }
  });
};
