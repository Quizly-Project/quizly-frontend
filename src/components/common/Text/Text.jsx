import React from 'react';
import PropTypes from 'prop-types';
import styles from './Text.module.css';
import '../../../styles/App.css';

/**
 * Text 컴포넌트는 다양한 스타일 옵션을 가진 텍스트 요소를 렌더링합니다.
 *
 * @component
 * @example
 * <Text type="title" align="center" color="primary" size="large" weight="bold">
 *   큰 제목
 * </Text>
 *
 * @param {React.ReactNode} props.children - 텍스트 내용
 * @param {'left'|'center'|'right'} [props.align='left'] - 텍스트 정렬
 * @param {'title'|'subtitle'|'body'|'caption'} [props.type='body'] - 텍스트 유형
 * @param {'primary'|'secondary'|'error'|'success'|'white'} [props.color='primary'] - 텍스트 색상
 * @param {'small'|'medium'|'large'|'xlarge'|'xxlarge'} [props.size='medium'] - 텍스트 크기
 * @param {'normal'|'bold'} [props.weight='normal'] - 텍스트 두께
 * @param {React.ElementType} [props.as='p'] - 렌더링할 HTML 요소
 * @param {string} [props.className] - 추가적인 CSS 클래스
 * @param {Object} [props...] - 추가 props는 렌더링되는 요소에 전달됩니다
 *
 * @returns {React.ReactElement} 스타일이 적용된 텍스트 요소
 */
const Text = ({
  children,
  align = 'left',
  type = 'body',
  color = 'primary',
  size = 'medium',
  weight = 'normal',
  as: Component = 'p',
  className: extraClassName,
  ...props
}) => {
  const className = [
    styles[type],
    styles[`align-${align}`],
    styles[`color-${color}`],
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    extraClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

Text.propTypes = {
  // children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  type: PropTypes.oneOf(['title', 'subtitle', 'body', 'caption']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'success',
    'white',
    'black',
    'grey',
    'whitegrey',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
  weight: PropTypes.oneOf(['normal', 'bold']),
  as: PropTypes.elementType,
  className: PropTypes.string,
};

export default Text;
