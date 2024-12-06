<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
    DarkMode,
    Button,
  } from "flowbite-svelte";
  import { page } from "$app/stores";
  let { svg, email }: { svg: string; email: string | undefined } = $props();
</script>

<Navbar>
  <NavBrand href="/">
    <img src="/R_H.png" class="me-3 h-6 sm:h-9" alt="RH Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >RedHaven</span
    >
  </NavBrand>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <!-- <span class="block text-sm">Bonnie Green</span> -->
      <span class="block truncate text-sm font-medium">{email}</span>
    </DropdownHeader>
    <!-- <DropdownItem>Dashboard</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Earnings</DropdownItem>
    <DropdownDivider /> -->
    <form action="/demo/lucia/?logout" method="post">
      <DropdownItem type="submit">Sign out</DropdownItem>
    </form>
  </Dropdown>
  <NavUl activeUrl={$page.url.pathname}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/morale">Morale</NavLi>
    <NavLi href="/stationInfo">Station Info</NavLi>
    <!-- <NavLi href="/contact">Contact</NavLi> -->
  </NavUl>
  <div class="flex items-center md:order-2">
    <DarkMode />
    {#if email}
      <Avatar id="avatar-menu" src={svg} />
    {:else}
      <Button href="/demo/lucia">Sign in</Button>
    {/if}
    <!-- <NavHamburger class="w-full md:flex md:w-auto md:order-1" /> -->
  </div>
</Navbar>
