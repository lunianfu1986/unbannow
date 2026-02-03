import { Metadata } from 'next';
import KeystaticApp from './keystatic';

export const metadata: Metadata = {
  title: 'Keystatic',
  description: 'Content Management System',
};

export default function KeystaticPage() {
  return <KeystaticApp />;
}
