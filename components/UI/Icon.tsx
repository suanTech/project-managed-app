
import React from "react";
import * as icons from "react-feather";

export type IconName = keyof typeof icons;

export type IconProps = {
  name: IconName;
  className?: string
} & icons.IconProps;

export function Icon({ name, className, ...rest }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent aria-label={name} className={className} {...rest} />;
}