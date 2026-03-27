export const AvatarPreloader = ({ size = 16 }: { size: number }) => (
    <div className={`absolute w-${size} h-${size} z-500 bg-gray-200 rounded-xl animate-pulse`} />
);
