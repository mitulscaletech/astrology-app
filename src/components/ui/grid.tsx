import React, { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
  size?: string;
}

interface ColProps {
  children: ReactNode;
  className?: string;
}

interface GridComponent extends React.FC<GridProps> {
  Col: React.FC<ColProps>;
}

const Grid: GridComponent = ({ children, className = "", size }) => {
  return (
    <div
      className={`flex flex-wrap ${className} 
  ${!size ? "-mx-2 lg:-mx-3 [&>*]:px-2 lg:[&>*]:px-3" : ""} 
  ${size === "lg" ? "-mx-1.5 md:-mx-2.5 xl:-mx-4 [&>*]:px-1.5 [&>*]:md:px-2.5 [&>*]:xl:px-4" : ""}
  ${size === "md" ? "-mx-1.5 [&>*]:px-1.5 md:-mx-2 md:[&>*]:px-2" : ""}
  ${size === "sm" ? "-mx-1.5 [&>*]:px-1.5" : ""}
  ${size === "xs" ? "-mx-1 [&>*]:px-1" : ""} `}
    >
      {children}
    </div>
  );
};

const Col: React.FC<ColProps> = ({ children, className = "" }) => {
  return <div className={`${className} w-full`}>{children}</div>;
};

Grid.Col = Col;

export default Grid;
