import { Metadata } from 'next';
import { generateDesignMetadata } from '@/lib/metadata';
import DesignPageClient from './page-client';

export const metadata: Metadata = generateDesignMetadata();

export default function DesignPage() {
  return <DesignPageClient />;
}
