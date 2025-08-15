"use client";

import React from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return null;
};

export default LoginModal;
