import React from 'react';
import { darken, lighten } from 'polished';
import { Flex } from '../base';
import raveproTheme from './ravepro';

export default {
  title: 'Others/Palette',
};

const PaletteColor: React.FC<{
  color: string;
  size: number;
  name: string;
}> = ({ color, size, name }) => (
  <Flex
    width="300px"
    my="4px"
    alignItems="center"
    bg={darken(0.3, color)}
    borderRadius={size / 2}
    height={size}
  >
    <Flex
      ml={size / 4}
      bg={color}
      height={size / 1.5}
      width={size / 1.5}
      borderRadius={size / 1.5}
    />
    <Flex px="12px" color={lighten(0.3, color)}>
      {name}
    </Flex>
  </Flex>
);

const Palette: React.FC<{ colors: { [key: string]: string } }> = ({
  colors,
}) => {
  const size = 30;

  return (
    <Flex flexDirection="column">
      {Object.keys(colors).map((colorKey) => (
        <PaletteColor
          key={colorKey}
          name={colorKey}
          color={colors[colorKey]}
          size={size}
        />
      ))}
    </Flex>
  );
};

export const Ravepro = () => {
  return <Palette colors={raveproTheme.colors} />;
};
