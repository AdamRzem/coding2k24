<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownItem, DropdownHeader, DropdownDivider, DarkMode } from 'flowbite-svelte';
</script>

<Navbar>
  <NavBrand href="/">
    <img src="/R_H.png" class="me-3 h-6 sm:h-9" alt="RH Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RedHaven</span>
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src="/images/profile-picture-3.webp" />
    <NavHamburger class="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">Bonnie Green</span>
      <span class="block truncate text-sm font-medium">name@flowbite.com</span>
    </DropdownHeader>
    <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
  <NavUl>
    <NavLi href="/about">About</NavLi> 
    <NavLi href="/morale">Morale</NavLi>
    <NavLi href="/stationInfo">Station Info</NavLi>
    <!-- <NavLi href="/contact">Contact</NavLi> -->
    <DarkMode />
  </NavUl>
</Navbar>