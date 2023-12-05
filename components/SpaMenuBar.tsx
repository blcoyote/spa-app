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
    <Menubar className='mb-5'>
      <MenubarMenu>
        <MenubarTrigger>Spa</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Reload</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Om</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
