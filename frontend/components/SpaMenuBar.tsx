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
  return (
    <Menubar className='px-5 py-7 rounded-full drop-shadow-md bg-card'>
      <MenubarMenu>
        <MenubarTrigger>Spa</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Reload</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Om</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
