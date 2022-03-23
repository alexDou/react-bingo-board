import React, { ReactElement } from "react";
import Dialog from "rc-dialog";

import "rc-dialog/assets/index.css";

const ErrorHandler = ({
  error,
  onClose
}: {
  error?: Error;
  onClose?: () => void;
}): ReactElement => {
  if (!error) {
    return null;
  }

  return (
    <Dialog
      visible={true}
      animation="zoom"
      maskAnimation="fade"
      wrapClassName="darkDialog errorDialog"
      closable={!!onClose}
      onClose={onClose}
      // title={i18n.t(Localisation.ERROR_TITLE)}
      title="App Error"
    >
      <p>{error.message}</p>
    </Dialog>
  );
};

export default ErrorHandler;
