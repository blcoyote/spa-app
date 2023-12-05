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
    <Menubar className='px-5 py-7 rounded-full'>
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
