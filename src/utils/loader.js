export function getButtonText(buttonText, tail, button) {
  if (buttonText.split(" ").length > 1) {
    const buttonTexts = buttonText.split(" ");

    return /\w*e\b/.test(buttonTexts[0])
      ? /\w*e\b/.exec(buttonTexts[0]).toString().replace(/\w\b/, tail)
      : button.textContent.toString().split(" ")[0] +
          tail +
          " " +
          button.textContent.toString().split(" ")[1];
  }
  return /\w*e\b/.test(buttonText)
    ? /\w*e\b/.exec(buttonText).toString().replace(/\w\b/, tail)
    : button.textContent.toString() + tail;
}

export const loader = ({
  dots,
  completeTimeDelay,
  buttonSelector,
  clickHandler,
  callbackEnd = () => {},
  onError = () => {},
  onSuccess = () => {},
  element,
  successMessage,
  failMessage,
}) => {
  const { interval, count } = dots;
  const button = buttonSelector;
  button && button.setAttribute("disabled", true);
  const buttonText = button.textContent.toString();
  const buttonStateProcessing = getButtonText(buttonText, "ing", button);
  const buttonStateComplete = getButtonText(buttonText, "ed", button);
  const targetElement = element ? element : button;

  targetElement.textContent = buttonStateProcessing;

  const loop = () => {
    targetElement.textContent =
      targetElement.textContent.length > buttonStateProcessing.length + count
        ? `${buttonStateProcessing}`
        : targetElement.textContent + ".";
  };
  let intervalController = setInterval(loop, interval);

  clickHandler()
    .then(() => {
      clearInterval(intervalController);
      targetElement.textContent = element
        ? successMessage
        : `${buttonStateComplete} successfully`;
      setTimeout(() => {
        onSuccess();
      }, completeTimeDelay);
    })
    .catch((err) => {
      targetElement.textContent = failMessage ? failMessage : `Failed`;
      setTimeout(() => {
        onError(err);
      }, completeTimeDelay);
      clearInterval(intervalController);
    })
    .finally(() => {
      setTimeout(() => {
        callbackEnd();
      }, completeTimeDelay * 3);

      setTimeout(() => {
        targetElement.textContent = `${buttonText}`;
        button && button.removeAttribute("disabled");
      }, completeTimeDelay * 2);
    });
};
