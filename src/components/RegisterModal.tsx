"use client";

import React from "react";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return null;
};

export default RegisterModal;
