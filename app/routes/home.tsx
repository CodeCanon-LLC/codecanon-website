import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { buttonVariants } from 'fumadocs-ui/components/ui/button'
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'CodeCanon LLC' },
    { name: 'description', content: 'Welcome to CodeCanon LLC!' },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="p-4 flex flex-col items-center justify-center text-center flex-1">
        <Link
          className={buttonVariants({ variant: "primary" })}
          to="/docs"
        >
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  );
}
