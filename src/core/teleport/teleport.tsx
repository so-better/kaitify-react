import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TeleportPropsType } from "./props";

/**
 * 传送组件
 */
export default function Teleport(props: TeleportPropsType) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof props.to === "string") {
      const el = document.querySelector(props.to);
      if (el) setContainer(el as HTMLElement);
    } else if (props.to instanceof HTMLElement) {
      setContainer(props.to);
    } else {
      setContainer(document.body)
    }
  }, [props.to]);

  return container ? createPortal(props.children, container) : null
}