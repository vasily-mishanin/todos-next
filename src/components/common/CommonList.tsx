type CommonListProps = {
  items: Record<string, any>[];
  itemComponent: React.FC<any>;
  resourceName: string;
  listStyleClasses: string;
  handler?: { handlerName: string; handlerBody: Function };
  children?: JSX.Element;
};

export function CommonList({
  items,
  itemComponent: ItemComponent,
  resourceName,
  listStyleClasses,
  children,
  handler,
}: CommonListProps) {
  const { handlerName, handlerBody } = handler || {};
  const itemHandler = handlerName ? { [handlerName]: handlerBody } : null;
  return (
    <ul className={listStyleClasses}>
      {items.map((item, i) => (
        <li key={item.id}>
          <ItemComponent {...{ [resourceName]: item, ...itemHandler }} />
        </li>
      ))}
      {children}
    </ul>
  );
}
