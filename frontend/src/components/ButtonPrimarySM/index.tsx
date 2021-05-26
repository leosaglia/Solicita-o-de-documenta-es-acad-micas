import React from 'react';

import { Button } from './styles';

const ButtonSM: React.FC = ({ children }) => {
return <Button type="submit">{children}</Button>;
}

export default ButtonSM;