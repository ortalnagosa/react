import { ReactNode } from "react";

export enum FlexDirectionTypes {
  Row = "row",
  Col = "col",
}

export enum Aligns {
  START = "start",
  CENTER = "center",
  END = "end",
  BETWEEN = "between",
  AROUND = "around",
  EVENLY = "evenly",
}

type FlexProps = {
  children: ReactNode;
  direction: FlexDirectionTypes;
  justify: Aligns;
  items: Aligns;
  wrap?: boolean;
  className?: string;
};

const Flex = (props: FlexProps) => {
  const { children, direction, justify, items, wrap, className } = props;

  return (
    <div
      className={`justify-${justify} items-${items} flex flex-${direction} ${wrap && "flex-wrap"} p-2  ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
