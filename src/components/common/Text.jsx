import styles from './Text.module.css';
import '../../styles/App.css';

const Text = ({ children, align, type }) => {
  const className = `${align} ${styles[type]}`.trim();
  return <p className={className}>{children}</p>;
};

export default Text;
