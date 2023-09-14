import PropTypes from 'prop-types';

type TabItemProps = {
  title: string;
  active?: boolean;
  index: string;
  icon?: React.ReactNode;
  width: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const TabItem = ({ title, active, icon, width, onClick }: TabItemProps) => {
  const activeText = active ? 'text-cooled-blue' : 'text-lazy-gray';
  return (
    <div
      style={{ width: `${width}rem` }}
      className={`inline-block cursor-pointer mb-2 font-Cafe24Surround ${
        active ? 'border-b-2 border-cooled-blue text-cooled-blue' : 'border-b-2'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-1 h-[1.5rem] text-lazy-gray">
        {icon && <span className={`mb-1 ${activeText}`}>{icon}</span>}
        <span
          style={{ fontWeight: active ? 'bold' : 'normal' }}
          className={`text-[1.125rem] ${activeText}`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

TabItem.defaultProps = {
  __TYPE: 'Tab.Item',
};

TabItem.propTypes = {
  __TYPE: PropTypes.oneOf(['Tab.Item']),
};

export default TabItem;
