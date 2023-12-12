'use client';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function SpaMenuBar() {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    switch (event.currentTarget.id) {
      case 'reload':
        window.location.reload();
        break;
      case 'about':
        break;
      default:
        break;
    }
  };

  return (
    <Menubar className='px-5 py-7 drop-shadow-md bg-card'>
      <MenubarMenu>
        <MenubarTrigger>Spa</MenubarTrigger>
        <MenubarContent>
          <MenubarItem id='reload' onClick={handleClick}>
            Reload
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem id='about' onClick={handleClick}>
            Om
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
