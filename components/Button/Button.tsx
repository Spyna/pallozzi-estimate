import React from "react";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}
export enum ButtonVariant {
  outlined = "outlined",
  solid = "solid",
}

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  size,
  variant = ButtonVariant.solid,
  ...props
}: ButtonProps) {
  let classNames = "";

  if (size === ButtonSize.sm) {
    classNames += " text-sm";
  }
  if (variant == ButtonVariant.solid) {
    classNames += " bg-teal-700 text-white";
  } else {
    classNames += " border border-teal-700 text-teal-700 hover:text-white";
  }

  return (
    <button
      className={
        " hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 rounded-lg px-3 py-1 mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800" +
        classNames
      }
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonGroup({
  children,
  size = ButtonSize.md,
  ...props
}: ButtonProps) {
  return (
    <button
      className="text-white bg-teal-700 hover:bg-teal-800 focus:ring focus:ring-teal-300 font-medium rounded-r-lg px-5 py-3 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
      {...props}
    >
      {children}
    </button>
  );
}
