import React, { useMemo, useState } from 'react';
import TabItem from './TabItem';

const childrenToArray = (children: React.ReactNode, ...types: string[]): React.ReactElement[] => {
  return React.Children.toArray(children).reduce<React.ReactElement[]>((acc, element) => {
    if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
      acc.push(element);
    }
    return acc;
  }, []);
};

type TabProps = {
  children: React.ReactNode;
  active?: boolean;
  maxWidth?: string;
};

const Tab = ({ children, active, maxWidth }: TabProps) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active;
    } else {
      const index = childrenToArray(children, 'Tab.Item')[0].props.index;
      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, 'Tab.Item').map((element) => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive]);

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items],
  );

  return (
    <div>
      <div className="flex">{items}</div>
      <div style={{ maxWidth: `${maxWidth}rem` }}>{activeItem?.props.children}</div>
    </div>
  );
};

Tab.Item = TabItem;

export default Tab;
