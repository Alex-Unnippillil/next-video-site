import dynamic from 'next/dynamic';

const Player = dynamic(() => import('./Player'), { ssr: false });

export default Player;
export * from './Player';
