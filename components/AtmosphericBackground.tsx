import styles from "./AtmosphericBackground.module.css";

/**
 * Extremely subtle atmospheric backdrop: slow gradient fields, large blurred
 * shapes, SVG grain. Near-static — content stays the focus.
 */
export default function AtmosphericBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.fieldA} />
      <div className={styles.fieldB} />
      <div className={styles.fieldC} />
      <div className={styles.grain} />
    </div>
  );
}
