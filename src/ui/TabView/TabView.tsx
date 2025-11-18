import React, { ReactElement, Children, useRef } from 'react';
import styles from '../../styles/tab-view.module.scss';
import type { TabPanelProps } from './TabPanel';

export interface TabViewProps {
  children: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
  activeIndex: number;
  onTabChange: (e: { index: number }) => void;
}

const TabView: React.FC<TabViewProps> = ({ 
  children, 
  activeIndex, 
  onTabChange 
}) => {
  const baseIdRef = useRef<string>(
    `tabview-${Math.random().toString(36).slice(2)}`
  );
  const baseId = baseIdRef.current;

  const handleTabClick = (index: number): void => {
    onTabChange({ index });
  };

  const tabChildren = Children.toArray(children).filter(
    (child): child is ReactElement<TabPanelProps> => React.isValidElement(child)
  );

  const tabItems = tabChildren.map((child, index) => {
    const isActive = index === activeIndex;
    const isDisabled = child.props.disabled === true;
    const tabId = `${baseId}-tab-${index}`;
    const panelId = `${baseId}-panel-${index}`;

    return {
      child,
      index,
      isActive,
      isDisabled,
      tabId,
      panelId
    };
  });

  return (
    <div className={styles.tabView}>
      <div className={styles.tabHeaders} role="tablist">
        {tabItems.map(({ child, index, isActive, isDisabled, tabId, panelId }) => {
          return (
            <button
              key={tabId}
              type="button"
              onClick={() => !isDisabled && handleTabClick(index)}
              disabled={isDisabled}
              role="tab"
              id={tabId}
              aria-selected={isActive}
              aria-controls={panelId}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
            >
              <div className={`${styles.tabContent} ${isActive ? styles.active : ''}`}>
                <i className={`pi ${child.props.isValidated ? 'pi-circle-fill' : 'pi-circle'}`}></i>
                <div className={styles.tabHeaderText}>
                  <span className={styles.tabTitle}>{child.props.header}</span>
                  {child.props.subheader && (
                    <span className={styles.tabSubtitle}>{child.props.subheader}</span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className={styles.tabPanelContent}>
        {tabItems.map(({ child, panelId, tabId, isActive }) => (
          <div
            key={panelId}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!isActive}
            aria-hidden={!isActive}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabView;

