import React from "react";

import styles from "./ruby-tooltip.module.css";

const RubyTooltip: React.FC = ({ children }) => (
  <div className={styles.tooltip}>
    <div className={styles.body}>
      {children}
    </div>
  </div>
);

export default RubyTooltip;
