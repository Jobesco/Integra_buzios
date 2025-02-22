import { Button } from './button';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface LinkButtonProps extends ComponentProps<typeof Button> {
  href: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} passHref>
      <Button asChild {...props}>
        <a>{children}</a>
      </Button>
    </Link>
  );
};
