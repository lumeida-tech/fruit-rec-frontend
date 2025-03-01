
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { Inter } from "next/font/google"
import { Apple, GalleryVerticalEnd, Shield, User, Activity, Settings } from "lucide-react"
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] })

const data = {
  navMain: [
    {
      title: "Tableau de board",
      url: "#",
      icon: <GalleryVerticalEnd className="h-5 w-5" />,
      items: [
        {
          title: "Détecteur de fruit",
          url: "/dashboard/",
          icon: <Apple className="h-4 w-4" />,
        },
        {
          title: "Activités effectuées",
          url: "/dashboard/activities",
          icon: <Activity className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Paramètre",
      url: "#",
      icon: <Settings className="h-5 w-5" />,
      items: [
        {
          title: "Profil",
          url: "/dashboard/profile",
          icon: <User className="h-4 w-4" />,
        },
        {
          title: "Sécurité",
          url: "/dashboard/security",
          icon: <Shield className="h-4 w-4" />,
          isActive: true,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className={inter.className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <Apple className="size-10 text-primary font-extrabold" />
                <span className="text-lg font-semibold">Fruit Recognition</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className=""></div>
      <SidebarContent>
        <SidebarGroup className="border-b border-muted/20 pb-4 mb-4">
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="text-lg font-semibold">
                  <Link href={item.url} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="pl-6">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={item.isActive}
                          className="text-base font-normal flex items-center gap-2 hover:bg-primary/10 transition-colors duration-200 rounded-md p-2"
                        >
                          <Link href={item.url} className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}