import Image from "next/image";

const SidebarRow = ({ src, Icon, title }) => {
  return (
    <div className="p-2 flex items-center space-x-2 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          src={src}
          className="rounded-full"
          width={30}
          height={30}
          layout="fixed"
          alt={title}
        />
      )}

      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
};

export default SidebarRow;
