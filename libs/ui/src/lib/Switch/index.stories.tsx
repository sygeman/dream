import React, { useState } from 'react';
import { Switch } from './';

export default {
  title: 'Components/Switch',
};

export const Simple = () => {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} onChange={setChecked} />;
};
