'use client'

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import {cn} from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Chart} from "@/components/Chart";
import {Button} from "@/components/ui/button";
import {FolderIcon, ImageIcon, IndentIncreaseIcon, PlusIcon, VideoIcon} from "lucide-react";
import ChartClient from "@/components/ChartClient";
import {useUpload} from "@/context/UploadContext";

import { loadStripe } from "@stripe/stripe-js";
import {getCurrentUser} from "@/lib/actions/user.actions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
interface Props {
  fullName: string;
  avatar: string;
  email: string;
  used: number;
  total: number;
  currentUser: any,

}

const Sidebar =  ({currentUser, used, total }: Props) => {

    const pathname = usePathname()
  const { setUploadType, setUploaderOpen } = useUpload(); // добавить

  const handleUpload = (type: "document" | "video" | "image" | "folder") => {
    setUploadType(type);
    setUploaderOpen(true);
  };
  const handleClick = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: currentUser?.$id }),
    });
    const data = await res.json();
    const stripe = await stripePromise;
    console.log(stripe)
    stripe?.redirectToCheckout({ sessionId: data.id });
    console.log(data)
  };
 // const CHEСKOUT_URL = "https://codevex.lemonsqueezy.com/buy/b4c3a095-fd0c-4258-9506-7fbf79412b16";

    return (
    <aside className="sidebar">
      <Link href="/" className='mb-6 flex items-center gap-4'>
        <Image
          src="/assets/icons/logo-full-brand.png"
          alt="logo"
          width={40}
          height={40}
          className=" hidden h-auto lg:block"
        />Drive</Link>


      <DropdownMenu>
        <DropdownMenuTrigger>

            <Button variant='ghost' className='w-full   border border-black py-6 text-black'>
              <PlusIcon className='size-12 ' />
              <p className=' hidden lg:block'>Создать</p>

            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Загрузить</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleUpload("document")}> {/* only docs is allowed */}
            <FolderIcon /> Документ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpload("folder")}>{/* only foleds is allowed */}
            <FolderIcon /> Папку
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpload("video")}>  {/* only videos is allowed */}
            <VideoIcon /> Видео
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpload("image")}> {/* only images is allowed */}
            <ImageIcon /> Изображение
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="rounded-full transition hover:bg-blue/20 lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "bg-blue ",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>



        {/*    <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div> */}
        <ChartClient  used={used} total={total}/>


        <button onClick={handleClick} className='flex items-center justify-center gap-2 rounded-3xl border  border-blue py-6 font-semibold  text-blue transition hover:scale-105 hover:bg-muted/50 '>
          <IndentIncreaseIcon className='text-center '/>
          <p className='hidden lg:block'>
            Увеличить объём хранилища</p>

        </button>

    </aside>
  );
};
export default Sidebar;
